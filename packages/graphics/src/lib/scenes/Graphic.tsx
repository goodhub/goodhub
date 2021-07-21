import { FC, ReactNode, useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import { Configuration } from '.';
import { calcColorContrast } from '../helpers/Color';
import Webfont from 'webfontloader';

import { Waves, Spotlight, Shapes, getRandomPattern } from './backgrounds/Backgrounds';

import './Graphic.css';

export interface GraphicParams {
  backgroundColor: string
  backgroundStyle?: string
  backgroundPattern?: string
  primaryFont?: string
  secondaryFont?: string
  backgroundImage?: string
  logo?: string
}

export const defaultConfiguration: Configuration<GraphicParams> = {
  backgroundColor: { type: 'string', optional: true, default: 'red' },
  backgroundImage: { type: 'string', optional: true },
  primaryFont: { type: 'string', optional: true, default: 'Josefin Sans' },
  secondaryFont: { type: 'string', optional: true, default: 'Lato' },
  backgroundStyle: { type: 'string', optional: true },
  backgroundPattern: { type: 'string', optional: true, default: getRandomPattern() },
  logo: { type: 'string', optional: true }
}

const getBackgroundForStyle = (style?: string) => {
  switch (style) {
    case 'waves':
      return <Waves />
    case 'spotlight':
      return <Spotlight />
    case 'shapes':
      return <Shapes />
    default:
      return <></>
  }
}

export interface GraphicConfig {
  config: Configuration<any>
  values: GraphicParams & { [key: string]: any }
}

const getPalette = async (url: string) => {
  const response = await fetch('http://localhost:7071/api/get-palette-from-image', { method: 'POST', body: JSON.stringify({ url })});
  return response.json()
}

export const Graphic: FC<GraphicConfig & { children: (config: { [key: string]: any }) => ReactNode }> = ({ config, values, children }) => {
  const [params, setParams] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const errors = Object.keys(config).reduce<string[]>((failed, a) => {
      if (!config[a].optional && !values[a]) failed.push(a);
      return failed;
    }, []);
    setErrors(errors);

    setParams(Object.keys(config).reduce<{ [key: string]: (string | undefined) }>(((object, key) => {
      object[key] = (() => {
        if (values[key]) return values[key];
        if (config[key].default) return config[key].default;
      })();
      return object;     
    }), {}));
  }, [values, setParams, setErrors, config])

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [isVertical, setVertical] = useState(false)
  const [dominantColor, setDominantColor] = useState(values.backgroundColor);

  useEffect(() => {
    const v = width < height;
    if (v === isVertical) return;
    setVertical(v);
  }, [width, height, isVertical])

  useEffect(() => {
    (async () => {
      if (!params.backgroundColor && !params.backgroundImage) return;
      if (!params.backgroundImage) {
        setDominantColor(params.backgroundColor)
        return;
      }
      const { color } = await getPalette(params.backgroundImage);
      setDominantColor(color);
    })()
  }, [params.backgroundImage, params.backgroundColor])

  useEffect(() => {
    console.log('Loading fonts: ', params.primaryFont, params.secondaryFont)
    const fonts = [params.primaryFont, params.secondaryFont].filter(Boolean) as string[];
    if (fonts?.length === 0) return;
    console.log('Loaded fonts: ', params.primaryFont, params.secondaryFont)
    Webfont.load({ 
      google: {
        families: fonts
      }
    })
  }, [params.primaryFont, params.secondaryFont])

  if (errors?.length > 0) return <div>
    Required properties are not supplied: {errors.join(', ')}
  </div>

  return params ? <div ref={ref} className="graphic-container" style={{ backgroundImage: `url(${params.backgroundImage})`, backgroundColor: params.backgroundColor, color: calcColorContrast(dominantColor), fontFamily: `"${params.secondaryFont}"` }}>
    {children(params)}
    {values.backgroundStyle ? 
      <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} viewBox="0 0 605 338" preserveAspectRatio="none" fill={calcColorContrast(dominantColor)}>
        { getBackgroundForStyle(values.backgroundStyle) }
      </svg> : <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundImage: `url("${params?.backgroundPattern?.replace('currentColor', calcColorContrast(dominantColor))}")` }} />}
    {values.logo ? <img alt="The logo" src={values.logo} className="logo" /> : null}
  </div> : null
}