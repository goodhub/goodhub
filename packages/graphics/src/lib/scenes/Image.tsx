import { FC }  from 'react';
 
const Image: FC<{ rounded?: boolean, image: string }> = ({ rounded = false, image }) => {
  return <img width="100%" style={{ aspectRatio: '1/1', borderRadius: rounded ? '50%' : '2%', padding: rounded ? '0' : '1vmin' }} src={image} />
}
export default Image;