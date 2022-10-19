import create, { State } from 'zustand';
import { IWebsiteConfiguration } from '../../../shared';
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

const hexToRGB = (H: string): [number, number, number] => {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = Number("0x" + H[1] + H[1]);
    g = Number("0x" + H[2] + H[2]);
    b = Number("0x" + H[3] + H[3]);
  } else if (H.length === 7) {
    r = Number("0x" + H[1] + H[2]);
    g = Number("0x" + H[3] + H[4]);
    b = Number("0x" + H[5] + H[6]);
  }
  return [r, g, b];
}

const hexToHSL = (H: string) => {
  let [r,g,b] = hexToRGB(H);
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
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

    const [h, s, l] = hexToHSL(config.brandColors[2]);
    root.style.setProperty('--color-primary-50', `hsl(${h},${s}%,95%)`);
    root.style.setProperty('--color-primary-100', `hsl(${h},${s}%,90%)`);
    root.style.setProperty('--color-primary-200', `hsl(${h},${s}%,80%)`);
    root.style.setProperty('--color-primary-300', `hsl(${h},${s}%,70%)`);
    root.style.setProperty('--color-primary-500', `hsl(${h},${s}%,${l}%)`);
    root.style.setProperty('--color-primary-600', `hsl(${h},${s}%,40%)`);
    root.style.setProperty('--color-primary-700', `hsl(${h},${s}%,30%)`);
    root.style.setProperty('--color-primary-800', `hsl(${h},${s}%,20%)`);
    root.style.setProperty('--color-primary-appropriate', calcColorContrast(hexToRGB(config.brandColors[2])));
    return { ...state, state: WebsiteState.Identified, config }
  })
}))

export const getWebsiteConfiguration = async (lookup: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${lookup}/website`, options);
  await handleAPIError(response);
  return await response.json() as IWebsiteConfiguration;
};