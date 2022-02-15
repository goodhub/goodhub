import React, { FC } from 'react';
import useMeasure from 'react-use-measure';

import { Headline, Text } from '../components/Text';
import { Container, useContainer } from '../hooks/useContainer';

export default {
  title: 'Basic'
}

export const fittedText = () => {
  return <div style={{ height: 200, display: 'flex', backgroundColor: 'lightgray' }}>
    <Text width={200} style={{backgroundColor: 'gray'}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Text>
  </div>
}

export const fittedTextWithContainer = () => {
  
  const Frame: FC = ({ children }) => {
    const [ref, measurements] = useMeasure();
    return <div ref={ref} style={{ height: '100vh', aspectRatio: '1/1', display: 'flex' }}>
      <Container value={measurements} >
        {children}
      </Container>
    </div>
  }

  const Graphic: FC = () => {
    const { width } = useContainer();
    return width ? <Text width={width} style={{backgroundColor: 'gray'}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Text> : <></>
  }

  return <Frame>
    <Graphic />
  </Frame>
}

export const headline = () => {
  return <div style={{ width: 700, display: 'flex', backgroundColor: 'lightgray' }}>
    <Headline width={700} style={{backgroundColor: 'gray'}}>
      Lorem ipsum dolor sit amet.
    </Headline>
  </div>
}