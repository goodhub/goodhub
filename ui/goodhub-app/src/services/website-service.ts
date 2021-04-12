import create, { State } from 'zustand';
import { IWebsiteConfiguration } from '@strawberrylemonade/goodhub-lib';
import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export interface WebsiteService extends State {}

export const useWebsiteService = create<WebsiteService>((set) => ({}))

export const getWebsiteConfiguration = async (lookup: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${lookup}/website`, options);
  await handleAPIError(response);
  return await response.json() as IWebsiteConfiguration;
};