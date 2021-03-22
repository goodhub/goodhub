import { IPost } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';

import Modal, { ModalState } from '../generic/Modal';

import { getPost } from '../../services/post-service';
import Picture from '../generic/Picture';
import { ContentRenderer } from '../content/ContentRenderer';
import { PostMetadata } from './PostMetadata';
import Spinner from '../generic/Spinner';
import { FiX } from 'react-icons/fi';

export interface PostModalProps {
  state: [ModalState, string?]
  onDismiss: () => void
}

export const PostModal: FC<PostModalProps> = ({ state, onDismiss }) => {

  const [modalState, postId] = state;
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    (async () => {
      if (!postId) return;
      const post = await getPost(postId);
      setPost(post);
    })()

    return () => {
      setPost(undefined);
    }
  }, [postId])

  return <Modal className={`max-w-4xl w-full sm:my-8 ${!post ? 'justify-center items-center' : ''}`} layout={'items-center'} padding="p-0" state={modalState} onDismiss={onDismiss}>
    { post ? <div className="flex flex-col">
      <button onClick={onDismiss} className={`m-4 p-2 fixed right-0 top-0 ${post.hero ? 'bg-black bg-opacity-50 hover:bg-opacity-75' : 'hover:bg-gray-100'} rounded-md z-10`}><FiX className={`w-6 h-6 ${post.hero ? 'text-white' : 'text-gray-700' }`}></FiX></button>
      {post.hero?.image ? <Picture image={post.hero?.image}></Picture> : null}
      <div className="p-6 pb-3 sm:p-6">
        <ContentRenderer content={post.text}></ContentRenderer>
        <div className="pt-4 mt-5 border-t border-gray-200 flex flex-col items-start sm:items-center justify-between sm:flex-row">
          <PostMetadata postedAt={post.postedAt.toDateString()} identity={post.postedIdentity} personId={post.postedBy} organisationId={post.organisationId}></PostMetadata>
        </div>
      </div>
    </div> : <Spinner className="my-12" size="8"></Spinner> }
  </Modal>
}