import { FC } from 'react';
import { Content, Block } from '@strawberrylemonade/goodhub-lib';

interface HeaderProps {
  data: {
    level: number
    text: string
  }
}
const Header: FC<HeaderProps> = ({ data }) => {
  return <h2 className="text-xl" dangerouslySetInnerHTML={{__html: data.text}}></h2>
}

interface ParagraphProps {
  data: {
    text: string
  }
}
const Paragraph: FC<ParagraphProps> = ({ data }) => {
  return <p dangerouslySetInnerHTML={{__html: data.text}}></p>
}

const getComponentForBlock = (block: Block) => {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph data={block.data}/>
    
    //@ts-ignore
    case 'header': return <Header data={block.data}/>
    default:
      return;
  }
}

export interface ContentRendererProps {
  content: Content
}
export const ContentRenderer: FC<ContentRendererProps> = ({ content }) => {
  return <>
    { content.blocks.map((block => getComponentForBlock(block))) }
  </>
}