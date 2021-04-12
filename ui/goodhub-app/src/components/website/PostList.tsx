import { FC } from 'react';
import Posts from '../posts/Posts';

export interface PostListProps {
  orgId: string
}

const PostList: FC<PostListProps> = ({ orgId }) => {
  return <div className="flex flex-col flex-1 w-screen max-w-6xl h m-auto p-6 md:py-12 min-h-64">
    <Posts columns={2} />
  </div>;
}

export default PostList;