import { FC } from 'react';
import { Content, Block } from '@strawberrylemonade/goodhub-lib';



interface ParagraphProps {
  text: string
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return <p className="sm:text-base text-sm" dangerouslySetInnerHTML={{__html: text}}></p>
}

interface HeadingProps {
  text: string
}

const Heading: FC<HeadingProps> = ({ text }) => {
  return <h1 className="text-gray-800 sm:text-xl text-lg font-semibold mb-2" dangerouslySetInnerHTML={{__html: text}}></h1>
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
  return <>
    { content.blocks.map((block => getComponentForBlock(block))) }
  </>
}