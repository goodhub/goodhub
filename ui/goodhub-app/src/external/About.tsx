import { Content } from '@strawberrylemonade/goodhub-lib';
import { FC } from 'react';
import { ContentRenderer } from '../components/content/ContentRenderer';
import PageTitle from '../components/website/PageTitle';

export interface AboutProps {
  about?: Content
}
 
const About: FC<AboutProps> = ({ about }) => {
  return <div className="flex-1">
    <div className="m-auto max-w-4xl mt-3 sm:mt-12 rounded-md shadow-sm overflow-hidden bg-white">
      <PageTitle title="About us" />
      <div className="px-6 py-12 sm:px-12">
        { about ? <ContentRenderer content={about} /> : null }
      </div>
    </div>
  </div>;
}

export default About;