import { FC, useEffect, useState } from 'react';

import { IPost } from '@strawberrylemonade/goodhub-lib';
import { getPopularPosts } from '../../services/post-service';
import { Post } from './Post';

export interface PostsProps { }

const Posts: FC<PostsProps> = () => {

  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    (async () => {
      const posts = await getPopularPosts();
      setPosts(posts);
    })()
  }, [])

  return <div className="flex flex-col flex-grow">
    <div className="bg-gray-100 border border-gray-200 px-6 py-2 mb-3 flex items-center">
      <h2 className="font-semibold text-gray-700">Popular</h2>
    </div>

    {posts.map((post) => {
      return <Post key={post.id} post={post}></Post>
    })}
    
  </div>;
}

export default Posts;