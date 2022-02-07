import * as React from 'react';
import { Configuration, Scene } from '..';
import { defaultConfiguration, Graphic, GraphicParams } from '../Graphic';

import Text from '../Text';
import Image from '../Image';

import './Basic.css';

interface BasicParams extends GraphicParams {
  title: string
  text: string
  photo?: string
}

const configuration: Configuration<BasicParams> = {
  ...defaultConfiguration,
  title: { type: 'string' },
  text: { type: 'string' },
  photo: { type: 'string', optional: true }
}
 
const Basic: React.FC<BasicParams> = (values) => {

  return <Graphic config={configuration} values={values}>
    { (config: { [key: string]: any }) => (
      <div className="basic-container">
        { values.photo ? <div className="basic-image-container">
          <Image rounded image={config.photo} />
        </div> : null }
        <div className="basic-content-container">
          <div className="basic-title-container" style={{ fontFamily: `"${config.primaryFont}"` }}>
            <Text minFontSize={24}>{config.title}</Text>
          </div>
          <div className="separator"></div>
          <div className="basic-text-container">
            <Text minFontSize={24}>{`${config.text?.trim()}`}</Text>
          </div>
        </div>
      </div>
    )}
  </Graphic>
}

const BasicConfiguration: Scene<BasicParams> = {
  configuration,
  name: 'basic',
  view: Basic
}

export default BasicConfiguration;