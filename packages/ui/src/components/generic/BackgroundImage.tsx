import { CSSProperties, FC } from 'react';
import type { IImage } from '@Types';

interface BackgroundImageProps {
  image: IImage
  className?: string
  blur?: number
  backgroundStyle?: [string?, CSSProperties?]
  pictureStyle?: [string?, CSSProperties?]
}


const BackgroundImage: FC<BackgroundImageProps> = ({ blur = 24, image, children, backgroundStyle, pictureStyle }) => {

  const style: CSSProperties = {
    ...image.placeholder,
    filter: `blur(${blur}px)`,
    transform: 'scale(1.2)',
  }

  return <div className={`w-full h-full ${backgroundStyle?.[0]}`} style={{...backgroundStyle?.[1]}}>
    <div className={`w-full h-full ${pictureStyle?.[0]}`} style={{...pictureStyle?.[1]}}>
      <div style={style}></div>
      <picture>
        <source media="(max-width: 999px)" srcSet={image.standard} />
        <source media="(min-width: 1000px)" srcSet={image.original} />
        <img className="absolute inset-1/2 -translate-y-1/2 -translate-x-1/2 transform animate-fadein w-full min-h-full" src={image.original} alt={image.alt}></img>
      </picture>
    </div>
    <div className="absolute inset-0 w-full h-full">{ children }</div>
  </div>
}

export default BackgroundImage;