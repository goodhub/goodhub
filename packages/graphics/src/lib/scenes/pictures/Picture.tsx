import { FC }  from 'react';
import { Configuration, Scene } from '..';
import { defaultConfiguration, Graphic, GraphicParams } from '../Graphic';

import { ReactFitty } from 'react-fitty';

import './Picture.css';

interface PictureParams extends GraphicParams {
  title?: string
}

const configuration: Configuration<PictureParams> = {
  ...defaultConfiguration,
  title: { type: 'string', optional: true }
}
 
const Picture: FC<PictureParams> = (values) => {

  return <Graphic config={configuration} values={values}>
    { () => (
      <div className="picture-container">
        { values.title ? <div className="picture-title-container">
          <ReactFitty maxSize={34}>{values.title}</ReactFitty>
        </div> : null }
      </div>
    )}
  </Graphic>
}

const PictureConfiguration: Scene<PictureParams> = {
  configuration,
  name: 'Picture',
  view: Picture
}

export default PictureConfiguration;