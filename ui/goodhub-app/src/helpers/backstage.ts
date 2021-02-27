import { bucket } from 'kvdb.io';

console.log(process.env);

const api = bucket(process.env.REACT_APP_BACKSTAGE_APP_ID);

export const getSetting = async (key: string) => {
  try {
    return await api.get(key);
  }  catch (e) {
    return;
  }
}