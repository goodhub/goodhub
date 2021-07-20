import { FC } from 'react';
import { IHeroLink } from '@strawberrylemonade/goodhub-lib';
import { useMeasure } from 'react-use';

interface LinkProps {
  hero: IHeroLink
}

const Link: FC<LinkProps> = ({ hero }) => {

  const [ref, { width }] = useMeasure<HTMLAnchorElement>();

  return <a target="_blank" rel="noreferrer" href={hero.link.resolution.requestUrl} className="flex flex-col bg-gray-50" ref={ref}>
    <div style={{ backgroundImage: `url(${hero.link.resolution.ogImage.url})`, height: width / 1.778 }} className="bg-cover bg-center h-64"></div>
    <div className="p-5 border-t border-b border-gray-200 ">
      <p className="text-lg font-bold">{hero.link.resolution.ogTitle}</p>
      <p className="">{hero.link.resolution.ogDescription}</p>
      <p className="text-gray-500 text-sm">{hero.link.resolution.requestUrl}</p>
    </div>
  </a>
}

export default Link;