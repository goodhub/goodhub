import { FC, ReactNode, useEffect, useState } from 'react';
import { useMeasure } from 'react-use';
import { Configuration } from '.';
import { calcColorContrast } from '../helpers/Color';
import Webfont from 'webfontloader';

import { Waves, Spotlight, Shapes } from './backgrounds/Backgrounds';

import './Graphic.css';

export interface GraphicParams {
  backgroundColor: string
  backgroundStyle: string
  fontFamily: string
  backgroundImage?: string
  logo?: string
}

export const defaultConfiguration: Configuration<GraphicParams> = {
  backgroundColor: { type: 'string', optional: true, default: 'red' },
  backgroundImage: { type: 'string', optional: true },
  fontFamily: { type: 'string', optional: true, default: 'Inter' },
  backgroundStyle: { type: 'string', default: 'none' },
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

export const Graphic: FC<GraphicConfig & { children: (isVertical: boolean, dominantColor?: string) => ReactNode }> = ({ config, values, children }) => {
  const [params, setParams] = useState<{ [key: string]: any }>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const errors = Object.keys(config).reduce<string[]>((failed, a) => {
      if (!config[a].optional && !values[a]) failed.push(a);
      return failed;
    }, []);
    setErrors(errors);

    setParams(values);
  }, [values, setParams, setErrors])

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const [isVertical, setVertical] = useState(false)
  const [dominantColor, setDominantColor] = useState(values.backgroundColor);

  useEffect(() => {
    const v = width < height;
    if (v === isVertical) return;
    setVertical(v);
  }, [width, height])

  useEffect(() => {
    (async () => {
      if (!values.backgroundImage) {
        setDominantColor(values.backgroundColor)
        return;
      }
      const { color } = await getPalette(values.backgroundImage);
      setDominantColor(color);
    })()
  }, [values.backgroundImage, values.backgroundColor])

  useEffect(() => {
    if (!values.fontFamily) return;
    Webfont.load({ 
      google: {
        families: [values.fontFamily]
      }
    })
  }, [values.fontFamily])

  if (errors.length > 0) return <div>
    Required properties are not supplied: {errors.join(', ')}
  </div>

  return params ? <div ref={ref} className="graphic-container" style={{ backgroundImage: `url(${params.backgroundImage})`, backgroundColor: params.backgroundColor, color: calcColorContrast(dominantColor), fontFamily: params.fontFamily }}>
    {children(isVertical, dominantColor)}
    {values.backgroundStyle ? 
      <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} viewBox="0 0 605 338" preserveAspectRatio="none" fill={calcColorContrast(dominantColor)}>
        { getBackgroundForStyle(values.backgroundStyle) }
      </svg> : null}
    {values.logo ? <img src={values.logo} className="logo" /> : null}
  </div> : null
}