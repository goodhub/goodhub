import { FC }  from 'react';
 
const Image: FC<{ rounded?: boolean, image: string }> = ({ rounded = false, image }) => {
  return <div style={{ 
    aspectRatio: '1/1', 
    width: '100%', 
    position: 'relative',
    backgroundImage: `url(${image})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    borderRadius: rounded ? '50%' : '2%', 
    padding: rounded ? '0' : '1vmin' }}>

    <div style={{
      width: '112%',
      zIndex: -1,
      aspectRatio: '1/1',
      borderRadius: rounded ? '50%' : '2%', 
      position: 'absolute',
      backgroundColor: "currentcolor",
      
      top: `-${(0.4 + (Math.random() * 0.2)).toFixed(3)}em`,
      left: `-${(0.4 + (Math.random() * 0.2)).toFixed(3)}em`
    }}></div>
  </div>
}
export default Image;