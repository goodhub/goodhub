import { StepObject } from 'react-albus';

declare module 'react-albus' {
  interface StepObject {
    validate?: string[];
  }
}
