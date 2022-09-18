import { Content, IImage } from '../types';
import { FC } from 'react';
import { ContentRenderer } from '../components/content/ContentRenderer';
import Card from '../components/generic/Card';
import Title from '../components/generic/Title';
import BackgroundImage from '../components/generic/BackgroundImage';
// import { getWebsiteConfiguration } from '../services/website-service';

export interface AboutProps {
  name: string
  about?: Content
  image?: IImage
}

const About: FC<AboutProps> = ({ name, about, image }) => {
  return <div className="flex-1 flex flex-col items-center">
    { image ? <div className="h-56 w-full overflow-hidden relative">
      <BackgroundImage image={image} />
    </div> : null }
    {/* <Card decoration className="m-auto max-w-4xl mt-3 mb-5 sm:mt-12 overflow-hidden"> */}
    <Card decoration className={`w-full max-w-4xl overflow-hidden z-10 ${image ? '-mt-12' : 'mt-8'}`}>
      <div className="px-6 py-8 w-full flex flex-col items-center sm:px-12">
        <p className="text-xs font-medium text-gray-500 uppercase py-1">About us</p>
        <Title className="mb-8">{name}</Title>
        {about ? <ContentRenderer content={about} /> : null}
      </div>
    </Card>
  </div>;
}

export default About;