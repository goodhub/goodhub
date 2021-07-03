import { FC } from 'react';
import { Content, Block } from '@strawberrylemonade/goodhub-lib';



interface ParagraphProps {
  text: string
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return <p dangerouslySetInnerHTML={{__html: text}}></p>
}

interface HeadingProps {
  text: string
}

const Heading: FC<HeadingProps> = ({ text }) => {
  return <h1 dangerouslySetInnerHTML={{__html: text}}></h1>
}


const applyInlineStyles = (block: any) => {
  const string: string = block.text;
  const [range] = block.inlineStyleRanges;
  if (!block.inlineStyleRanges.length) return string;
  return [string.slice(0, range.offset), '<strong>', string.slice(range.offset, range.length), '</strong>', string.slice(range.length)].join('');
}

const getComponentForBlock = (block: Block) => {
  switch (block.type) {
    case 'unstyled':
      return <Paragraph text={applyInlineStyles(block)}/>
    //@ts-ignore
    case 'header-one':
      return <Heading text={applyInlineStyles(block)}/>
  }
}

export interface ContentRendererProps {
  content: Content
}
export const ContentRenderer: FC<ContentRendererProps> = ({ content }) => {
  return <div className="goodhub-content">
    { content.blocks.map((block => getComponentForBlock(block))) }
  </div>
}