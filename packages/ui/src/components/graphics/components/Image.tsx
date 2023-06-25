import * as React from 'react';
import { useMeasure } from 'react-use';

const Image: React.FC<{ rounded?: boolean; image: string }> = ({ rounded = false, image }) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: width,
        position: 'relative',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: rounded ? '50%' : '2%',
        padding: rounded ? '0' : '1vmin'
      }}
    >
      <div
        style={{
          width: '112%',
          height: '112%',
          zIndex: -1,
          borderRadius: rounded ? '50%' : '2%',
          position: 'absolute',
          backgroundColor: 'white',

          top: `-${(0.4 + Math.random() * 0.2).toFixed(3)}em`,
          left: `-${(0.4 + Math.random() * 0.2).toFixed(3)}em`
        }}
      ></div>
    </div>
  );
};
export default Image;
