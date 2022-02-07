import React from 'react';

import { getSceneById } from '../';

const scene = getSceneById('quote');
const View = scene.view;

export default {
  title: 'Basic',
  component: View,
}

const configuration = Object.keys(scene.configuration).reduce<{[key: string]: any }>((config, key) => {
  config[key] = scene.configuration[key]?.default
  return config;
}, {})

export const basic = () => <View {...configuration} text={'James'} />;