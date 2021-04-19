import create, { State } from 'zustand';
import { IWebsiteConfiguration } from '@strawberrylemonade/goodhub-lib';
import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export enum WebsiteState {
  Unknown,
  Loading,
  Identified,
  Failed
}

export const calcColorContrast = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140
    ? 'rgb(0,0,0)'
    : 'rgb(255,255,255)'
}

export interface WebsiteService extends State {
  state: WebsiteState

  config?: IWebsiteConfiguration
  setWebsiteLookupLoading: () => void
  setWebsiteLookupError: (message: string) => void
  setWebsiteConfig: (config: IWebsiteConfiguration) => void
}

export const useWebsiteService = create<WebsiteService>((set) => ({
  state: WebsiteState.Unknown,  
  setWebsiteLookupLoading: () => set((state) => ({ ...state, state: WebsiteState.Loading })),
  setWebsiteLookupError: (message: string) => set((state) => ({ ...state, state: WebsiteState.Failed, error: message })),
  setWebsiteConfig: (config: IWebsiteConfiguration) => set((state) => {
    const root = window.document.documentElement;

    const [h, s, l] = config.primaryColor.hsl;
    root.style.setProperty('--color-primary-50', `hsl(${h},${s}%,95%)`);
    root.style.setProperty('--color-primary-100', `hsl(${h},${s}%,90%)`);
    root.style.setProperty('--color-primary-200', `hsl(${h},${s}%,80%)`);
    root.style.setProperty('--color-primary-300', `hsl(${h},${s}%,70%)`);
    root.style.setProperty('--color-primary-500', `hsl(${h},${s}%,${l}%)`);
    root.style.setProperty('--color-primary-600', `hsl(${h},${s}%,40%)`);
    root.style.setProperty('--color-primary-700', `hsl(${h},${s}%,30%)`);
    root.style.setProperty('--color-primary-800', `hsl(${h},${s}%,20%)`);

    root.style.setProperty('--color-primary-appropriate', calcColorContrast(config.primaryColor.rgb));

    root.style.setProperty('--color-secondary', config.secondaryColor.hex);
    root.style.setProperty('--color-secondary-appropriate', calcColorContrast(config.secondaryColor.rgb));

    return { ...state, state: WebsiteState.Identified, config }
  })
}))

export const getWebsiteConfiguration = async (lookup: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${lookup}/website`, options);
  await handleAPIError(response);
  return await response.json() as IWebsiteConfiguration;
};