import { IExternalLink } from '../../../../shared';
import { FC } from 'react';
import { FiChevronRight, FiGlobe } from 'react-icons/fi';

export interface ExternalLinksProps {
  links: IExternalLink[];
}

const Link: FC<{ link: IExternalLink }> = ({ link }) => {
  return (
    <a
      className="flex-1 p-4 flex flex-col items-center sm:items-start sm:p-8 border-gray-100 border-b last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
      href={link.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-row sm:flex-col mb-2 sm:mb-0 items-center sm:items-start">
        <FiGlobe className="w-10 h-10 rounded-md text-primary-appropriate bg-primary-500 p-2" />
        <h2 className="mt-2 font-bold text-lg sm:text-xl ml-2 sm:ml-0">{link.name}</h2>
      </div>
      <p>{link.description}</p>
      <div className="flex items-center">
        <p className="text-sm font-semibold">Learn more</p>
        <FiChevronRight strokeWidth={3} />
      </div>
    </a>
  );
};

const ExternalLinks: FC<ExternalLinksProps> = ({ links }) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="flex flex-col sm:flex-row flex-wrap max-w-6xl m-auto">
        {links.map(link => (
          <Link key={link.url} link={link}></Link>
        ))}
      </div>
    </div>
  );
};

export default ExternalLinks;
