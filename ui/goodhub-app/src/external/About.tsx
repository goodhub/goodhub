import { Content } from '@strawberrylemonade/goodhub-lib';
import { FC } from 'react';
import { ContentRenderer } from '../components/content/ContentRenderer';
import Card from '../components/generic/Card';
import Title from '../components/generic/Title';

export interface AboutProps {
  name: string
  about?: Content
}

const About: FC<AboutProps> = ({ name, about }) => {
  return <div className="flex-1">
    <Card decoration className="m-auto max-w-4xl mt-3 mb-5 sm:mt-12 overflow-hidden">
      <div className="px-6 py-8 w-full flex flex-col items-center sm:px-12">
        <p className="text-xs font-medium text-gray-500 uppercase py-1">About us</p>
        <Title className="mb-8">{name}</Title>
        {about ? <ContentRenderer content={about} /> : null}
      </div>
    </Card>
  </div>;
}

export default About;