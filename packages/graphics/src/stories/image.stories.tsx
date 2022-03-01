import { getSceneById } from '../';

const scene = getSceneById('basic');
const View = scene.view;

export default {
  title: 'Image',
  component: View,
}

const configuration = {
  backgroundColor: '#ad1f7e',
  logo: 'https://beta.goodhub.org.uk/logo192.png',
  title: 'A title of this post long!',
  name: 'James Williams',
  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
}

export const imageHorizontal = () => <div style={{ display: 'flex', width: '100%', aspectRatio: '16/9' }}>
  <View {...configuration} />
</div>;

export const imageWithPhoto = () => <div style={{ display: 'flex', width: '100%', aspectRatio: '16/9' }}>
  <View {...configuration} photo="https://beta.goodhub.org.uk/logo192.png" />
</div>;

export const imageVertical = () => <div style={{ display: 'flex', height: '100vh', aspectRatio: '9/16' }}>
  <View {...configuration} />
</div>;