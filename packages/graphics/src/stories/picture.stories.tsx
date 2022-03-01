import { getSceneById } from '../';

const scene = getSceneById('picture');
const View = scene.view;

export default {
  title: 'Picture',
  component: View,
}

const configuration = {
  backgroundImage: 'https://beta.goodhub.org.uk/logo192.png',
  title: 'A title of this post !'
}

export const imageHorizontal = () => <div style={{ display: 'flex', width: '100%', aspectRatio: '16/9' }}>
  <View {...configuration} />
</div>;

export const imageVertical = () => <div style={{ display: 'flex', height: '100vh', aspectRatio: '9/16' }}>
  <View {...configuration} />
</div>;