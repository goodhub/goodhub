import { getSceneById } from '../';

const scene = getSceneById('quote');
const View = scene.view;

export default {
  title: 'Scenes',
  component: View,
}

const configuration = Object.keys(scene.configuration).reduce<{[key: string]: any }>((config, key) => {
  config[key] = scene.configuration[key]?.default
  return config;
}, {})

export const quoteHorizontal = () => <div style={{ display: 'flex', width: '100%', aspectRatio: '16/9' }}>
  <View {...configuration} name="James Williams" text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
</div>;

export const quoteVertical = () => <div style={{ display: 'flex', height: '100vh', aspectRatio: '9/16' }}>
  <View {...configuration} name="James Williams" text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'} />
</div>;