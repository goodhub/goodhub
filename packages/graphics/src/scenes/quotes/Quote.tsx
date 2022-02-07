import * as React from 'react'
import { Configuration, Scene } from '..';
import { defaultConfiguration, Graphic, GraphicParams } from '../Graphic';
import Text from '../Text';

import './Quote.css';

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

  return <Graphic config={configuration} values={values}>
    { () => (
      <div className="quote-text-container">
        <Text minFontSize={24}>{`"${values.text?.trim()}"`}</Text>
        { values.name ? <span style={{ marginTop: -10 }}><i>{values.name}</i></span> : null }
      </div>
    )}
  </Graphic>
}

const QuoteConfiguration: Scene<QuoteParams> = {
  configuration,
  name: 'Quote',
  view: Quote
}

export default QuoteConfiguration;