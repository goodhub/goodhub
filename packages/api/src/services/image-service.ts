import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { readFile, writeFile } from "fs/promises";
import { v4 } from "uuid";
import sharp from "sharp";
import { getPixelsCSS } from "@plaiceholder/css";
import { IImage } from "../../../shared";
import { File, WorkingFolder } from "../helpers/temp";

import db from "./database-client";
import { Model } from "sequelize";
import {
  requiredString,
  requiredNumber,
  syncOptions,
  requiredJSON,
  optionalString,
} from "../helpers/db";

class Image extends Model {}

(async () => {
  try {
    Image.init(
      {
        id: {
          ...requiredString,
          primaryKey: true,
        },
        createdBy: { ...optionalString },
        original: { ...requiredString },
        standard: { ...requiredString },
        thumbnail: { ...requiredString },
        alt: { ...requiredString },
        ratio: { ...requiredNumber },
        placeholder: { ...requiredJSON },
      },
      {
        sequelize: await db(),
        modelName: "Image",
      }
    );

    await Image.sync(syncOptions);
    console.log('[DEV] Successful table sync for "Image"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Image"');
    console.error(err);
    process.exit(1);
  }
})();

let containerClient: ContainerClient;
let account: string;
let containerName: string;

const getContainerClient = async () => {
  if (containerClient) return { containerClient, account, containerName };

  if (
    !process.env.BLOB_ACCOUNT_NAME ||
    !process.env.BLOB_ACCOUNT_KEY ||
    !process.env.BLOB_IMAGE_CONTAINER_NAME
  )
    throw new Error(
      "Missing BLOB_ACCOUNT_NAME or BLOB_ACCOUNT_KEY or BLOB_IMAGE_CONTAINER_NAME"
    );

  account = process.env.BLOB_ACCOUNT_NAME;
  const key = process.env.BLOB_ACCOUNT_KEY;

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net/`,
    new StorageSharedKeyCredential(account, key)
  );
  containerName = process.env.BLOB_IMAGE_CONTAINER_NAME;
  containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists({ access: "blob" });
  return { containerClient, account, containerName };
};

enum ImageQuality {
  Original = "original",
  Standard = "standard",
  Thumbnail = "thumbnail",
}

type url = string;

export interface ProcessedImage {
  location: File;
  alt: string;
  encoding: string;
  mimetype: string;
}

export const processAndUploadImage = async (
  originalInput: ProcessedImage,
  creatorId: string,
  dir?: WorkingFolder
) => {
  if (!dir) dir = await WorkingFolder.init();

  const id = v4();
  const output: Partial<IImage> = {
    id,
    createdBy: creatorId,
  };

  try {
    const [image, info] = await transformImage(
      originalInput,
      ImageQuality.Original,
      dir
    );
    output.alt = image.alt;
    output.ratio = info.width / info.height;

    const imageUrl = await uploadImage(`${id}-original`, image);
    output.original = imageUrl;

    const [standardImage] = await transformImage(
      image,
      ImageQuality.Standard,
      dir
    );
    const standardImageUrl = await uploadImage(`${id}-standard`, standardImage);
    output.standard = standardImageUrl;

    const [thumbnailImage] = await transformImage(
      image,
      ImageQuality.Thumbnail,
      dir
    );
    const thumbnailImageUrl = await uploadImage(
      `${id}-thumbnail`,
      thumbnailImage
    );
    output.thumbnail = thumbnailImageUrl;

    const originalFile = await readFile(image.location.path);
    const placeholder = await getPixelsCSS(originalFile);
    output.placeholder = placeholder;

    await dir.cleanup();
    const response = await createImage(output as IImage);
    return response.toJSON() as IImage;
  } catch (e) {
    console.error(e);
    await dir.cleanup();
    throw e;
  }
};

const horizontalWidthForQuality = (quality: ImageQuality) => {
  switch (quality) {
    case ImageQuality.Standard:
      return 1200;
    case ImageQuality.Thumbnail:
      return 350;
    case ImageQuality.Original:
      return null;
  }
};

const transformImage = async (
  original: ProcessedImage,
  quality: ImageQuality,
  dir: WorkingFolder
): Promise<[ProcessedImage, sharp.OutputInfo]> => {
  const output: ProcessedImage = {
    ...original,
    location: dir.file(),
  };

  const info = await sharp(original.location.path)
    .resize(horizontalWidthForQuality(quality))
    .toFile(output.location.path);

  return [output, info];
};

export const uploadImage = async (id: string, image: ProcessedImage) => {
  const buffer = await readFile(image.location.path);
  return uploadBlob(id, buffer, buffer.byteLength, ImageQuality.Original);
};

export const createImage = async (image: IImage) => {
  return Image.create(image);
};

export const uploadManifest = async (id: string, image: IImage) => {
  const manifest = JSON.stringify(image);
  return uploadBlob(id, manifest, manifest.length, "application/json");
};

export const uploadBlob = async (
  id: string,
  body: string | Blob | ArrayBuffer,
  length: number,
  type: string
) => {
  const {
    containerClient,
    account,
    containerName,
  } = await getContainerClient();
  const blockBlobClient = containerClient.getBlockBlobClient(id);
  await blockBlobClient.upload(body, length, {
    blobHTTPHeaders: { blobContentType: type },
  });
  return `https://${account}.blob.core.windows.net/${containerName}/${id}`;
};
