import { FC, useEffect, useState } from 'react';
import { IPost } from '@strawberrylemonade/goodhub-lib';

import { getPopularPosts, usePostService, getPostsByOrganisationId } from '../../services/post-service';
import { Post } from './Post';
import Spinner from '../generic/Spinner';
import { PostModal } from './PostModal';
import { ModalState } from '../generic/Modal';
import { usePersonService } from '../../services/person-service';
import { useErrorService } from '../../services/error-service';

export interface PostsProps {
  columns?: number
  orgId?: string
  projectId?: string
}

const Posts: FC<PostsProps> = ({ columns = 1, orgId }) => {

  const [posts, recentlyPostedPost, setPosts, clearPosts, revalidatePosts] = usePostService(state => [state.posts, state.recentlyPostedPost, state.setPosts, state.clearPosts, state.revalidatePosts])
  const [postModalState, setPostModalState] = useState<[ModalState, string?]>([ModalState.Closed])

  const setError = useErrorService(state => state.setError);
  const personId = usePersonService(state => state.person?.id);

  useEffect(() => {
    clearPosts()
  }, [orgId, clearPosts])

  useEffect(() => {
    (async () => {
      if (posts) return;
      try {
        const response = await (async () => {
          if (orgId) return await getPostsByOrganisationId(orgId);
          return await getPopularPosts();
        })();
        setPosts(response);
      } catch (e) {
        setError(e);
      }
    })()
  }, [posts, setPosts, orgId, setError])

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

  const loaded = !!posts;

  const feeds = (() => {
    if (!posts || !posts.length) return []
    if (!columns) return [posts];
    return posts.reduce<IPost[][]>((feeds, post, i) => {
      feeds[i % columns].push(post);
      return feeds;
    },
      // Typescript doesn't like manually constructed arrays but this is a valid use.
      // eslint-disable-next-line
      new Array(columns).fill(null).map(() => new Array()));
  })()


  // Options: sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3

  return <div className={`flex flex-col`}>
    <PostModal state={postModalState} onDismiss={() => setPostModalState([ModalState.Closed])}></PostModal>

    { recentlyPostedPost ?
      <div className="bg-primary-300 bg-opacity-25 p-5 pb-2 sm:pb-0 mb-5 rounded-lg border border-primary-300 flex flex-col">
        <div className="flex text-primary-500 mb-4">
          <span className="flex items-center">
            <svg className="mr-2" width="15" height="15" viewBox="0 0 15 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3203 0.468142C14.0871 1.05649 14.2318 2.15505 13.6434 2.92184L6.82013 11.8145C6.51334 12.2144 6.04907 12.4625 5.54618 12.4955C5.04328 12.5284 4.5506 12.343 4.19425 11.9866L0.818175 8.61026C0.134786 7.92681 0.134833 6.81877 0.818279 6.13538C1.50173 5.452 2.60976 5.45204 3.29315 6.13549L5.25817 8.10067L10.8666 0.791232C11.455 0.0244443 12.5536 -0.120208 13.3203 0.468142Z" />
            </svg>
            <p className="leading-4">That was posted successfully!</p>
          </span>
        </div>
        <Post personId={personId} post={recentlyPostedPost}></Post>
      </div> : null }

    { loaded
      ? feeds.length > 0 
        ? <div className={`grid sm:grid-cols-${columns} grid-cols-1 gap-x-4`}>{
          feeds.map((feed) => <div className="flex flex-col">
            {feed.map(post => <Post personId={personId} key={post.id} post={post}
              open={(postId: string) => setPostModalState([ModalState.Open, postId])} />
            )}
          </div>)}
        </div>
        : <div className="py-5 px-6 w-full flex justify-center">
        <p className="text-xs font-medium text-gray-500 uppercase py-1">No posts</p>
      </div>
      : <div className="flex items-center justify-center pt-15">
        <Spinner size="12"></Spinner>
      </div>
    }

  </div>;
}

export default Posts;