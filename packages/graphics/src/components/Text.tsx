import * as React from "react";
import fit from "textfit";
import { Textfit } from "react-textfit";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  width: number | string;
  height?: number | string;
}

export const Text: React.FC<TextProps> = ({
  children,
  width,
  height,
  style,
  ...props
}) => {
  const ref = React.useRef<HTMLParagraphElement>(null);

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    fit(ref.current, {
      alignHoriz: true,
      multiLine: true,
      maxFontSize: 1000,
    });
  }, [children, width, height, ref.current]);

  return (
    <p
      {...props}
      style={{ ...style, width, height, display: "flex", alignItems: "center", margin: 0, lineHeight: "0.9" }}
      ref={ref}
    >
      {children}
    </p>
  );
};

export const Headline: React.FC<TextProps> = ({
  children,
  width,
  height,
  style,
  ...props
}) => {
  return (
    <Textfit
      {...props}
      style={{ ...style, width, height, display: "flex", alignItems: "center", margin: 0 }}
      mode="single"
      forceSingleModeWidth={true}
    >
      {children}
    </Textfit>
  );
};

export const SingleLineText: React.FC<TextProps> = ({
  children,
  width,
  height,
  style,
  ...props
}) => {
  return (
    <Textfit
      {...props}
      style={{ ...style, height, width, margin: 0, }}
      mode="single"
    >
      {children}
    </Textfit>
  );
};
