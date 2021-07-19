import { IComment, IPost } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';

import Modal, { ModalState } from '../generic/Modal';

import { getPost } from '../../services/post-service';
import Picture from '../generic/Picture';
import { ContentRenderer } from '../content/ContentRenderer';
import { PostMetadata } from './PostMetadata';
import Spinner from '../generic/Spinner';
import { FiX } from 'react-icons/fi';
import { DepGraph } from 'dependency-graph';
import { CommentForm, CommentProps, Comment } from '../conversations/Comment';

export interface PostModalProps {
  state: [ModalState, string?]
  onDismiss: () => void
}

const getPostAndFormatComments = async (postId: string): Promise<[IPost, CommentProps[]]> => {
  const post = await getPost(postId) as IPost;
  // Comments can be nested infinitely and so a graph is needed to construct the UI
  // from the flat array of comments with optional replyId property.
  const graph = new DepGraph();
  post.comments?.forEach(c => { graph.addNode(c.id, c) })
  post.comments?.forEach(c => { if (c.replyId) graph.addDependency(c.replyId, c.id) });

  const commentMagic = (comments: string[], level: number = 0): CommentProps[] => {
    if (!comments || comments.length === 0) return [];
    return comments.map((commentId) => {
      const comment = graph.getNodeData(commentId) as IComment;
      const childComments = graph.directDependenciesOf(commentId);
      const count = graph.dependenciesOf(commentId).length;
      return {
        comment,
        children: commentMagic(childComments, level + 1),
        level,
        postId,
        count
      }
    }).sort((a, b) => b.count - a.count)
  }

  const topLevelComments = graph.entryNodes();
  // Recursively construct comments
  const comments = commentMagic(topLevelComments);
  return [post, comments]
}

export const PostModal: FC<PostModalProps> = ({ state, onDismiss }) => {

  const [modalState, postId] = state;
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    (async () => {
      if (!postId) return;
      const [post, comments] = await getPostAndFormatComments(postId);
      setPost(post);
      setComments(comments);
    })()

    return () => {
      setPost(undefined);
      setComments([]);
    }
  }, [postId, setPost, setComments])

  const reloadPost = async () => {
    if (!postId) return;
    const [post, comments] = await getPostAndFormatComments(postId);
    setPost(post);
    setComments(comments);
  }

  return <Modal className={`max-w-3xl w-full h-screen h-screen-safe sm:h-fit-content sm:max-h-modal overflow-y-scroll sm:my-8 ${!post ? 'justify-center items-center' : ''}`} layout={'items-center'} padding="p-0" state={modalState} onDismiss={onDismiss}>
    <button onClick={onDismiss} className={`m-4 p-2 absolute right-0 top-0 ${post?.hero ? 'bg-black bg-opacity-50 hover:bg-opacity-75' : 'hover:bg-gray-100'} rounded-md z-10`}><FiX className={`w-6 h-6 ${post?.hero ? 'text-white' : 'text-gray-700' }`}></FiX></button>
    { post ? <div className="flex flex-col pb-2">
    { post.hero?.type === 'image' ? <Picture image={post.hero?.image}></Picture> : null}
      <div className="p-6 pb-1 sm:p-6">
        <ContentRenderer content={post.text}></ContentRenderer>
        <div className="pt-4 mt-5 border-t border-gray-200 flex flex-col items-start sm:items-center justify-between sm:flex-row">
          <PostMetadata postedAt={post.postedAt} identity={post.postedIdentity} personId={post.postedBy} organisationId={post.organisationId}></PostMetadata>
        </div>
        <div className="pt-4 mt-5 border-t border-gray-200 flex flex-col items-start sm:items-center justify-between sm:flex-row">
          {comments.length !== 0 ? comments.map((c) => <Comment onSubmit={() => reloadPost()} {...c} />) : <p className="w-full text-center mb-3">No comments yet.</p>}
        </div>
      </div>
        <div className="px-6 pt-3 pb-safe sticky bottom-0 z-20 bg-white border-t border-gray-300">
          <CommentForm onSubmit={() => reloadPost()} postId={post.id} placeholder="Add your voice to this conversation" />
        </div>
    </div> : <Spinner className="my-12" size="8"></Spinner> }
  </Modal>
}