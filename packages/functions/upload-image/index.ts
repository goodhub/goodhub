import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import * as Busboy from 'busboy';
import { File } from 'temporary';
import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';
import { v4 } from 'uuid';
import * as sharp from 'sharp';
import { getPixelsCSS } from '@plaiceholder/css';
import { getSetting } from '../backstage';

let containerClient: ContainerClient;
let account: string;
let containerName: string;

const getContainerClient = async () => {
  if (containerClient) return { containerClient, account, containerName };

  account = await getSetting('infra:storage:account_name');
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net/`,
    new StorageSharedKeyCredential(account, await getSetting('infra:storage:account_key'))
  );
  containerName = await getSetting('infra:storage:image_container_name');
  containerClient = blobServiceClient.getContainerClient(containerName);
  return { containerClient, account, containerName };
}

export enum Status {
  Success = 200,
  Failure = 400
}

enum ImageQuality {
  Original = 'original',
  Standard = 'standard',
  Thumbnail = 'thumbnail'
}

type url = string;

type Image = {
  id: string
  original: url
  standard: url
  thumbnail: url,
  alt: string,
  ratio: number,
  placeholder: {
    backgroundImage: string
    backgroundPosition: string
    backgroundSize: string
    backgroundRepeat: string
  }
}

export interface ProcessedImage {
  location: File
  name: string
  alt: string
  encoding: string
  mimetype: string
}

export const UploadImage: AzureFunction = async function (context: Context, req: HttpRequest, preProcessedImage: Partial<ProcessedImage>): Promise<(Partial<Image> | string)> {

  try {

    const id = v4();
    const output: Partial<Image> = {
      id: id
    }
    const originalInput = await processIncomingImage(req, preProcessedImage);
    const [image, info] = await transformImage(originalInput, ImageQuality.Original);
    output.alt = image.alt;
    output.ratio = info.width / info.height;

    const imageUrl = await uploadImage(`${id}-original`, image)
    output.original = imageUrl;

    const [standardImage] = await transformImage(image, ImageQuality.Standard)
    const standardUrl = await uploadImage(`${id}-standard`, standardImage)
    output.standard = standardUrl;

    const [thumbnailImage] = await transformImage(image, ImageQuality.Thumbnail)
    const thumbnailUrl = await uploadImage(`${id}-thumbnail`, thumbnailImage)
    output.thumbnail = thumbnailUrl;

    const originalFile = await readFile(image.location.path);
    const placeholder = await getPixelsCSS(originalFile);
    output.placeholder = placeholder;

    const body = await (() => {
      if (req?.query?.remote === undefined) return output;
      return uploadManifest(id, output as Image);
    })()


    if (!req) {
      return body;
    }

    context.res = {
      status: Status.Success,
      body: body
    };

  } catch (e) {

    if (!req) {
      throw e;
    }

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

};

const processIncomingImage = async (req: HttpRequest, preProcessedImage: Partial<ProcessedImage>): Promise<ProcessedImage> => {
  return new Promise((resolve, reject) => {
    const processed: Partial<ProcessedImage> = {
      location: new File(),
      ...preProcessedImage
    }

    if (preProcessedImage) {
      resolve(preProcessedImage as ProcessedImage);
      return;
    }

    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldName, file, filename, encoding, mimetype) => {
      if (fieldName !== 'image') {
        reject(new Error('Malformed request: file must have the fieldName "image"'))
      }
      processed.name = filename
      processed.encoding = encoding
      processed.mimetype = mimetype
      file.pipe(createWriteStream(processed.location.path));
    });

    busboy.on('field', (fieldName, value) => {
      processed[fieldName] = value;
    })

    busboy.on('finish', () => {
      resolve(processed as ProcessedImage);
    })

    busboy.write(req.body, (err) => {
      if (err) reject(err);
    });
  })
}

const horizontalWidthForQuality = (quality: ImageQuality) => {
  switch (quality) {
    case ImageQuality.Standard:
      return 1200;
    case ImageQuality.Thumbnail:
      return 500;
    case ImageQuality.Original:
      return null;
  }
}

const transformImage = async (original: ProcessedImage, quality: ImageQuality): Promise<[ProcessedImage, sharp.OutputInfo]> => {

  const output: ProcessedImage = {
    ...original,
    location: new File()
  }

  const info = await sharp(original.location.path)
    .resize(horizontalWidthForQuality(quality))
    .toFile(output.location.path)

  return [output, info];
}

const uploadImage = async (id: string, image: ProcessedImage) => {
  const { containerClient, account, containerName } = await getContainerClient();
  const blockBlobClient = containerClient.getBlockBlobClient(id);
  const imageBuffer = await readFile(image.location.path);
  await blockBlobClient.upload(imageBuffer.buffer, imageBuffer.byteLength, { blobHTTPHeaders: { blobContentType: image.mimetype } });
  return `https://${account}.blob.core.windows.net/${containerName}/${id}`;
}

const uploadManifest = async (id: string, image: Image) => {
  const { containerClient, account, containerName } = await getContainerClient();
  const blockBlobClient = containerClient.getBlockBlobClient(id);
  const content = JSON.stringify(image);
  await blockBlobClient.upload(content, content.length, { blobHTTPHeaders: { blobContentType: 'application/json' } });
  return `https://${account}.blob.core.windows.net/${containerName}/${id}`;
}