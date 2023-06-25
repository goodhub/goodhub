import { FC, useEffect } from 'react';
import { useOrganisations } from './organisations';
import { useParams } from 'react-router-dom';

function hexToHSL(H: string) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = Number('0x' + H[1] + H[1]);
    g = Number('0x' + H[2] + H[2]);
    b = Number('0x' + H[3] + H[3]);
  } else if (H.length === 7) {
    r = Number('0x' + H[1] + H[2]);
    g = Number('0x' + H[3] + H[4]);
    b = Number('0x' + H[5] + H[6]);
  }
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

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

export const useTheme = () => {
  const { organisation } = useOrganisations();

  useEffect(() => {
    if (!organisation) {
      const mint = {
        50: '#F7FBF9',
        100: '#CFFDF4',
        200: '#cfece7',
        300: '#91ECDA',
        400: '#50C7B0',
        500: '#47B19D',
        600: '#3F9E8C',
        700: '#2F7B6D',
        800: '#215A4F',
        900: '#12332D'
      };

      const root = window.document.documentElement;
      root.style.setProperty('--color-primary-50', mint['50']);
      root.style.setProperty('--color-primary-100', mint['100']);
      root.style.setProperty('--color-primary-200', mint['200']);
      root.style.setProperty('--color-primary-300', mint['300']);
      root.style.setProperty('--color-primary-400', mint['400']);
      root.style.setProperty('--color-primary-500', mint['500']);
      root.style.setProperty('--color-primary-600', mint['600']);
      root.style.setProperty('--color-primary-700', mint['700']);
      root.style.setProperty('--color-primary-800', mint['800']);
      root.style.setProperty('--color-primary-900', mint['900']);
      root.style.setProperty('--color-primary-appropriate', 'rgb(0,0,0)');
      return;
    }

    const root = window.document.documentElement;
    const [h, s] = hexToHSL(organisation.brandColors[2]);
    root.style.setProperty('--color-primary-50', `hsl(${h},${s}%,95%)`);
    root.style.setProperty('--color-primary-100', `hsl(${h},${s}%,90%)`);
    root.style.setProperty('--color-primary-200', `hsl(${h},${s}%,80%)`);
    root.style.setProperty('--color-primary-300', `hsl(${h},${s}%,70%)`);
    root.style.setProperty('--color-primary-500', `hsl(${h},${s}%,40%)`);
    root.style.setProperty('--color-primary-600', `hsl(${h},${s}%,30%)`);
    root.style.setProperty('--color-primary-700', `hsl(${h},${s}%,30%)`);
    root.style.setProperty('--color-primary-800', `hsl(${h},${s}%,20%)`);
    root.style.setProperty('--color-primary-appropriate', 'rgb(0,0,0)');
  }, [organisation]);
};

export const ThemeManager: FC = ({ children }) => {
  useTheme();
  return <>{children}</>;
};
