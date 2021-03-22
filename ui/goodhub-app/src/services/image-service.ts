import { withTransaction } from '@strawberrylemonade/goodhub-lib';
import { getSetting } from '../helpers/backstage';
import { InternalServerError } from '../helpers/errors';

let baseURL: string | undefined;
export const getBaseURL = async () => {
  if (baseURL) return baseURL;
  baseURL = await getSetting('microservices:upload_image:url');
  return baseURL;
}

export const uploadImage = withTransaction(async (image: File, alt: string) => {
  const url = await getBaseURL();
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