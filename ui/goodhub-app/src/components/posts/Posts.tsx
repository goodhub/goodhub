import { FC, useEffect, useState } from 'react';

import { getPopularPosts, usePostService } from '../../services/post-service';
import { Post } from './Post';
import Spinner from '../generic/Spinner';
import { PostModal } from './PostModal';
import { ModalState } from '../generic/Modal';
import { usePersonService } from '../../services/person-service';

export interface PostsProps { }

const Posts: FC<PostsProps> = () => {

  const [posts, recentlyPostedPost, setPosts, revalidatePosts] = usePostService(state => [state.posts, state.recentlyPostedPost, state.setPosts, state.revalidatePosts])
  const [postModalState, setPostModalState] = useState<[ModalState, string?]>([ModalState.Closed])

  const personId = usePersonService(state => state.person?.id);

  useEffect(() => {
    (async () => {
      if (posts && posts.length) return;
      const response = await getPopularPosts();
      setPosts(response);
    })()
  }, [posts, setPosts])

  useEffect(() => {
    const onRefocus = () => {
      revalidatePosts()
    }

    window.addEventListener('focus', onRefocus);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onRefocus);
    };
  }, [revalidatePosts]);

  return <div className="flex flex-col flex-grow">
    <PostModal state={postModalState} onDismiss={() => setPostModalState([ModalState.Closed])}></PostModal>

    {recentlyPostedPost ?
      <div className="bg-mint-300 bg-opacity-25 p-5 pb-2 sm:pb-0 mb-5 rounded-lg border border-mint-300 flex flex-col">
        <div className="flex text-mint-500 mb-4">
          <span className="flex items-center">
            <svg className="mr-2" width="15" height="15" viewBox="0 0 15 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3203 0.468142C14.0871 1.05649 14.2318 2.15505 13.6434 2.92184L6.82013 11.8145C6.51334 12.2144 6.04907 12.4625 5.54618 12.4955C5.04328 12.5284 4.5506 12.343 4.19425 11.9866L0.818175 8.61026C0.134786 7.92681 0.134833 6.81877 0.818279 6.13538C1.50173 5.452 2.60976 5.45204 3.29315 6.13549L5.25817 8.10067L10.8666 0.791232C11.455 0.0244443 12.5536 -0.120208 13.3203 0.468142Z" />
            </svg>
            <p className="leading-4">That was posted successfully!</p>
          </span>
        </div>
        <Post personId={personId} post={recentlyPostedPost}></Post>
      </div> : null}

    { posts.length
      ? posts.map((post) => <Post personId={personId} key={post.id} post={post}
        open={(postId: string) => {
          setPostModalState([ModalState.Open, postId]);
        }}
      ></Post>)
      : <div className="flex items-center justify-center pt-15">
        <Spinner size="12"></Spinner>
      </div>
    }

  </div>;
}

export default Posts;