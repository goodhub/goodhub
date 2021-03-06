import { FC } from 'react';
import { Content } from '@strawberrylemonade/goodhub-lib';

export interface ContentRendererProps {
  content: Content
}

export const ContentRenderer: FC<ContentRendererProps> = ({ content }) => {
  return <p>{content.blocks[0].data.text}</p>
}