import { FC } from 'react';
import { useMeasure } from 'react-use';
import { IImage } from '@strawberrylemonade/goodhub-lib';

interface PictureProps {
  image: IImage;
  className?: string;
  blur?: number;
}

const Picture: FC<PictureProps> = ({ blur = 24, image, className }) => {
  const [ref, { width }] = useMeasure<HTMLAnchorElement>();

  return image ? (
    <a
      className={`${className} overflow-hidden relative`}
      style={{ height: width / image.ratio }}
      ref={ref}
      href={image.original}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className="absolute w-full h-full bg-white"
        style={{ ...image.placeholder, filter: `blur(${blur}px)`, transform: 'scale(1.2)' }}
      />
      <img
        className="absolute w-full h-full bg-cover bg-center animate-fadein"
        alt={image.alt}
        src={image.standard}
        loading="lazy"
      />
    </a>
  ) : (
    <div className={`${className} relative`}>
      <div className="absolute w-full h-full bg-gray-300"></div>
    </div>
  );
};

export default Picture;
