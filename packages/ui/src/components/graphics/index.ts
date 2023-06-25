import { FC } from 'react';
import BasicConfiguration from './scenes/Basic';

export type Configuration<T> = {
  [P in keyof Required<T>]: { type: 'object' | 'boolean' | 'number' | 'string'; optional?: boolean; default?: string };
};
export interface Scene<T> {
  view: FC<T>;
  name: string;
  configuration: Configuration<T>;
}

export const defaultConfig = {};
export const scenes: { [key: string]: Scene<any> } = {
  basic: BasicConfiguration
};

export const registerScene = (scene: Scene<any>) => {
  return (scenes[scene.name] = scene);
};

export const getSceneById = (name: string) => {
  return scenes[name];
};
