import { FC } from 'react';
import BasicConfiguration from './basic/Basic';
import PictureConfiguration from './pictures/Picture';
import QuoteConfiguration from './quotes/Quote';

export type Configuration<T> = { [P in keyof Required<T>]: { type: "object" | "boolean" | "number" | "string", optional?: boolean, default?: string } }
export interface Scene<T> {
  view: FC<T>
  name: string
  configuration: Configuration<T>
}

export const defaultConfig = {
  
}
export const scenes: {[key: string]: Scene<any> } = {
  quote: QuoteConfiguration,
  picture: PictureConfiguration,
  basic: BasicConfiguration
};

export const registerScene = (scene: Scene<any>) => {
  return scenes[scene.name] = scene;
}

export const getSceneById = (name: string) => {
  return scenes[name];
}