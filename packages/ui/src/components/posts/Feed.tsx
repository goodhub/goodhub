import { FC } from 'react';
import Posts from './Posts';

export interface FeedProps {}

const Feed: FC<FeedProps> = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <Posts columns={2}></Posts>
    </div>
  );
};

export default Feed;
