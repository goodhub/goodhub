import { FC } from 'react';
import { Content, Block } from '@strawberrylemonade/goodhub-lib';



interface ParagraphProps {
  text: string
}

const Paragraph: FC<ParagraphProps> = ({ text }) => {
  return <p dangerouslySetInnerHTML={{__html: text}}></p>
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
  }
}

export interface ContentRendererProps {
  content: Content
}
export const ContentRenderer: FC<ContentRendererProps> = ({ content }) => {
  console.log(content);
  return <>
    { content.blocks.map((block => getComponentForBlock(block))) }
  </>
}