import * as React from 'react'
import { Configuration, Scene } from '..';
import { Text } from '../../components/Text';
import { Frame } from '../../components/Frame';
import { useContainer } from '../../hooks/useContainer';
import { defaultConfiguration, GraphicParams } from '../Graphic';
import { useParams } from '../../hooks/useParams';
import { useBackground } from '../../hooks/useBackground';
import { useFont } from '../../hooks/useFont';

interface QuoteParams extends GraphicParams {
  name?: string
  text: string
}

const configuration: Configuration<QuoteParams> = {
  ...defaultConfiguration,
  name: { type: 'string', optional: true },
  text: { type: 'string' }
}
 
const Quote: React.FC<QuoteParams> = (values) => {

  const { name, primaryFont, secondaryFont } = useParams(values, configuration);
  const { graphicStyle, patternStyle } = useBackground(values)
  const fontStyle = useFont([primaryFont, secondaryFont])

  const Graphic = () => {
    const { width, height = 0 } = useContainer()
    return <>
     { width && <Text width={width} height={height - (height * 0.15)}>{values.text}</Text> }
     { name && <span style={{ top: 0, position: 'relative' }}><i>{name}</i></span> }
    </>
  }

  const customStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
  
  return <Frame innerStyle={customStyle} style={{ ...fontStyle,  ...patternStyle, ...graphicStyle, justifyContent: 'center'}}>
    <Graphic />
  </Frame>
}

const QuoteConfiguration: Scene<QuoteParams> = {
  configuration,
  name: 'Quote',
  view: Quote
}

export default QuoteConfiguration;