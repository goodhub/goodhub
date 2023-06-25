import * as React from 'react';
import fit from 'textfit';
import { Textfit } from 'react-textfit';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  width: number | string;
  height?: number | string;
  text?: string;
}

export const Text: React.FC<TextProps> = ({ text = '', width, height, style, ...props }) => {
  const ref = React.useRef<HTMLParagraphElement>(null);

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    fit(ref.current, {
      alignHoriz: true,
      multiLine: true,
      maxFontSize: 1000
    });
  }, [text, width, height, ref.current]);

  return (
    <p
      {...props}
      style={{ ...style, width, height, display: 'flex', alignItems: 'center', margin: 0, lineHeight: '0.9' }}
      ref={ref}
    >
      {text}
    </p>
  );
};

export const Headline: React.FC<TextProps> = ({ text = '', width, height, style, ...props }) => {
  return (
    <Textfit
      {...props}
      style={{ ...style, width, height, display: 'flex', alignItems: 'center', margin: 0 }}
      mode="single"
      forceSingleModeWidth={true}
    >
      {text}
    </Textfit>
  );
};

export const SingleLineText: React.FC<TextProps> = ({ text = '', width, height, style, ...props }) => {
  return (
    <Textfit {...props} style={{ ...style, height, width, margin: 0 }} mode="single">
      {text}
    </Textfit>
  );
};
