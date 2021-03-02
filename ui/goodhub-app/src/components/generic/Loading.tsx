import { FC } from 'react';
import Spinner from './Spinner';

export interface LoadingProps {}
 
const Loading: FC<LoadingProps> = () => {
  return <div className="h-screen flex-grow flex items-center justify-center">
    <Spinner size="10"></Spinner>
  </div>;
}

export default Loading;