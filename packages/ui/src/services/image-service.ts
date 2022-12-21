import { IImage } from '../../../shared';
import { InternalServerError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export const getBaseUrl = async () => {
  return window.location.host
}

export const getUploadUrl = async () => {
  return window.uploadURL
}

export const getConvertUrl = async () => {
  return window.convertURL
}


export const uploadImage = async (image: File, alt: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const form = new FormData();
  form.append('image', image);
  form.append('alt', alt);

  const response = await fetch(`${baseUrl}/images`, {
    ...options,
    method: 'POST',
    body: form
  })
  return response.json()
}

export const graphicToImage = async (graphic: {[key: string]: any }, width?: number, height?: number) => {
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
}