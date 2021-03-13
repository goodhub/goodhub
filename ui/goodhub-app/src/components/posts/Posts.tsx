import { FC, useEffect, useState } from 'react';

import { IPost } from '@strawberrylemonade/goodhub-lib';
import { getPopularPosts } from '../../services/post-service';
import { Post } from './Post';
import Spinner from '../generic/Spinner';

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

    { posts.length
      ? posts.map((post) => <Post key={post.id} post={post}></Post>)
      : <div className="flex items-center justify-center pt-15">
          <Spinner size="12"></Spinner>
        </div>
    }
    
  </div>;
}

export default Posts;