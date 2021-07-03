import fetch from 'node-fetch';

export const getSetting = async (key: string) => {
  const url = new URL(process.env.BACKSTAGE_URL);
  url.pathname = `${url.pathname}/${key}`;
  const response = await fetch(url);
  if (response.status !== 200) throw new Error(`"${key}" is not a valid backstage key.`);
  return await response.text();
}