import { bucket } from 'kvdb.io';

const api = bucket(process.env.BACKSTAGE_APP_ID, process.env.BACKSTAGE_ACCESS_TOKEN);

export const getSetting = async (key: string) => {
  try {
    return await api.get(key);
  }  catch (e) {
    return;
  }
}