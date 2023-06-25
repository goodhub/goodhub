import React from 'react';
import { Waves, Spotlight, Shapes, getRandomPattern } from '../components/Backgrounds';
import { calcColorContrast } from '../helpers/Color';

interface BackgroundParams {
  backgroundColor: string;
  backgroundStyle?: string;
  backgroundPattern?: string;
  backgroundImage?: string;
}

const getBackgroundForStyle = (style?: string) => {
  switch (style) {
    case 'waves':
      return <Waves />;
    case 'spotlight':
      return <Spotlight />;
    case 'shapes':
      return <Shapes />;
    default:
      return <></>;
  }
};

export const useBackground = (params: BackgroundParams): { [key: string]: React.CSSProperties } => {
  const dominantColor = params.backgroundColor;
  const backgroundPattern = params.backgroundPattern ?? getRandomPattern();
  const patternStyle: React.CSSProperties = {
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
    backgroundColor: params.backgroundColor,
    color: calcColorContrast(dominantColor),
    backgroundImage: `url("${backgroundPattern.replace('currentColor', calcColorContrast(dominantColor))}")`
  };

  const graphicStyle = (() => {
    if (!params.backgroundImage) return {};
    return {
      backgroundImage: `url(${params.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  })();

  return {
    graphicStyle,
    patternStyle
  };
};
