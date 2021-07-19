import { FC }  from 'react';
 
const Image: FC<{ rounded?: boolean, image: string }> = ({ rounded = false, image }) => {
  return <div style={{ aspectRatio: '1/1', width: '100%', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: rounded ? '50%' : '2%', padding: rounded ? '0' : '1vmin' }}/>
}
export default Image;