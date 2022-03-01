import * as React from "react";
import useMeasure from "react-use-measure";
import { Container } from "../hooks/useContainer";

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  innerStyle?: React.CSSProperties;
}

export const Frame: React.FC<FrameProps> = ({
  children,
  style,
  innerStyle,
  ...props
}) => {
  const [ref, measurements] = useMeasure();
  const { height, width } = measurements;

  const innerHeight = parseInt((height * 0.8).toFixed(0));
  const innerWidth = parseInt((width * 0.8).toFixed(0));

  return (
    <div
      {...props}
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Container
        value={{
          ...measurements,
          height: innerHeight,
          width: innerWidth,
        }}
      >
        <div
          style={{
            ...innerStyle,
            height: innerHeight,
            width: innerWidth,
          }}
        >
          {children}
        </div>
      </Container>
    </div>
  );
};
