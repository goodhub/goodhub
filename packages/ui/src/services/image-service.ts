import { IImage, withTransaction } from '@strawberrylemonade/goodhub-lib';
import { getSetting } from '../helpers/backstage';
import { InternalServerError } from '../helpers/errors';

let baseUrl: string | undefined;
export const getBaseUrl = async () => {
  if (baseUrl) return baseUrl;
  baseUrl = await getSetting('connections:ui:base_url');
  return baseUrl;
}

let uploadUrl: string | undefined;
export const getUploadUrl = async () => {
  if (uploadUrl) return uploadUrl;
  uploadUrl = await getSetting('microservices:upload_image:url');
  return uploadUrl;
}

let convertUrl: string | undefined;
export const getConvertUrl = async () => {
  if (convertUrl) return convertUrl;
  convertUrl = await getSetting('microservices:graphic_to_image:url');
  return convertUrl;
}


export const uploadImage = withTransaction(async (image: File, alt: string) => {
  const url = await getUploadUrl();
  if (!url) throw new InternalServerError('Backstage is not configured correctly!');
  const form = new FormData();
  form.append('image', image);
  form.append('alt', alt);

  const response = await fetch(url, {
    method: 'POST',
    body: form
  })
  return response.json()
}, 'upload image');

export const graphicToImage = withTransaction(async (graphic: {[key: string]: any }, width?: number, height?: number) => {
  const url = await getConvertUrl();
  if (!url) throw new InternalServerError('Backstage is not configured correctly!');

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      config: graphic,
      size: {
        width: width ?? 600,
        height: height ?? 314
      },
      url: await getBaseUrl()
    })
  })
  return await response.json() as IImage;
}, 'graphic to image');