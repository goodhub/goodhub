import { InternalServerError } from './errors';

export const getSetting = async (key: string) => {
  if (!process.env.REACT_APP_BACKSTAGE_URL) throw new InternalServerError('Backstage is not configured correctly.')
  const url = new URL(process.env.REACT_APP_BACKSTAGE_URL);
  url.pathname = `${url.pathname}/${key}`;
  const response = await fetch(url.toString());
  if (response.status !== 200) throw new Error(`"${key}" is not a valid backstage key.`);
  return await response.text();
}