import { bucket } from 'kvdb.io';
import { InternalServerError } from './errors';

console.log(process.env);

if (!process.env.REACT_APP_BACKSTAGE_APP_ID) throw new InternalServerError('Backstage is not configured correctly.')
const api = bucket(process.env.REACT_APP_BACKSTAGE_APP_ID);

export const getSetting = async (key: string) => {
  try {
    return await api.get(key);
  }  catch (e) {
    return;
  }
}