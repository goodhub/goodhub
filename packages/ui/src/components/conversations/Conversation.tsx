import { FC, useEffect, useState } from 'react';
import { IComment, IPost } from '../../../../shared';
import { useParams } from 'react-router';
import { DepGraph } from 'dependency-graph';

import { getPost } from '../../services/post-service';

import Page from '../generic/Page';
import Title from '../generic/Title';
import Skeleton from '../generic/Skeleton';
import Card from '../generic/Card';
import { ContentRenderer } from '../content/ContentRenderer';
import { PostMetadata } from '../posts/PostMetadata';
import { CommentForm, CommentProps, Comment } from './Comment';
import { FiShare } from 'react-icons/fi';

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
        children:commentMagic(childComments, level + 1),
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

export interface ConversationParams { postId: string }
export interface ConversationProps { }
const Conversation: FC<ConversationProps> = () => {

  const [post, setPost] = useState<IPost>();
  const { postId } = useParams<ConversationParams>();
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    (async () => {
      if (!postId) return;
      const [post, comments] = await getPostAndFormatComments(postId);
      setPost(post);
      setComments(comments);
    })()
  }, [postId, setPost, setComments])

  const reloadPost = async () => {
    if (!postId) return;
    const [post, comments] = await getPostAndFormatComments(postId);
    setPost(post);
    setComments(comments);
  }
  
  return <Page
    back={{ to: '/conversations', title: 'Back to knowledge' }}
    actions={[
      { 
        name: <>
          <FiShare className="-ml-0.5 mr-2" />
          Share post
        </>,
        onClick: () => { } }
    ]}
    loading={!post}
  >
    {post ? <>
      <Card className="p-4 sm:px-8 sm:py-8">
        <Title size="2xl" className="mb-3" tight={false}>{post ? post.title : <Skeleton width="100%" />}</Title>
        <ContentRenderer content={post.text}></ContentRenderer>
        <div className="mt-5 mb-3 pb-6 border-b border-gray-200">
          <PostMetadata postedAt={post.postedAt} identity={post.postedIdentity} personId={post.postedBy} organisationId={post.organisationId}></PostMetadata>
        </div>

        <div className="pb-3">
          <CommentForm onSubmit={() => reloadPost()} postId={postId} placeholder="Add your voice to this conversation" />
        </div>

        {comments.map((c) => <Comment onSubmit={() => reloadPost()} {...c} />)}
      </Card>

    </> : null}
  </Page>;
}

export default Conversation;