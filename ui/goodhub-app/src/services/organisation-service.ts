import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export const getOrganisation = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}`, options);
  await handleAPIError(response);
  return response.json();
};