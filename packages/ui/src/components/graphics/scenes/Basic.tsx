import * as React from 'react';
import { Configuration, Scene } from '..';
import { Headline, SingleLineText, Text } from '../components/Text';
import { Frame } from '../components/Frame';
import { useContainer } from '../hooks/useContainer';
import { defaultConfiguration, GraphicParams } from '../default';
import { useParams } from '../hooks/useParams';
import { useBackground } from '../hooks/useBackground';
import { useFont } from '../hooks/useFont';

import Image from '../components/Image';

interface BasicParams extends GraphicParams {
  title: string;
  text: string;
  photo?: string;
}

const configuration: Configuration<BasicParams> = {
  ...defaultConfiguration,
  title: { type: 'string' },
  text: { type: 'string' },
  photo: { type: 'string', optional: true }
};

const Basic: React.FC<BasicParams> = values => {
  const { title, text, primaryFont, secondaryFont, photo } = useParams(values, configuration);
  const { graphicStyle, patternStyle } = useBackground(values);
  const fontStyle = useFont([primaryFont, secondaryFont]);

  const Graphic = () => {
    const { width = 0, height = 0 } = useContainer();

    const textWidth = photo ? width * 0.65 : width;
    return (
      <>
        {photo && (
          <div style={{ width: width * 0.3, marginRight: width * 0.05 }}>
            <Image rounded image={photo} />
          </div>
        )}
        {textWidth && (
          <div style={{ width: textWidth, height }}>
            <Headline className="uppercase text-center" width={textWidth} height={height * 0.3} text={title} />
            <div style={{ width: textWidth, borderTop: 'solid white 1px', marginBottom: height * 0.05 }}></div>
            <Text style={{ fontFamily: secondaryFont }} width={textWidth} height={height * 0.6} text={text.trim()} />
          </div>
        )}
      </>
    );
  };

  const customStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <Frame
      innerStyle={customStyle}
      style={{ ...fontStyle, ...graphicStyle, ...patternStyle, justifyContent: 'center', zIndex: 1 }}
    >
      <Graphic />
    </Frame>
  );
};

const BasicConfiguration: Scene<BasicParams> = {
  configuration,
  name: 'Basic',
  view: Basic
};

export default BasicConfiguration;
