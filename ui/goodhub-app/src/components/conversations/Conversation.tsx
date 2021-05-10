import { FC, useEffect, useState } from 'react';
import { IComment, IPost } from '@strawberrylemonade/goodhub-lib';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { DepGraph } from 'dependency-graph';

import { getPost, submitComment } from '../../services/post-service';
import { useErrorService } from '../../services/error-service';

import Page from '../generic/Page';
import Title from '../generic/Title';
import Skeleton from '../generic/Skeleton';
import Card from '../generic/Card';
import { ContentRenderer } from '../content/ContentRenderer';
import { PostMetadata } from '../posts/PostMetadata';
import { TextField } from '../generic/forms/TextField';
import Button from '../generic/Button';
import { BsReplyFill } from 'react-icons/bs';

interface CommentProps {
  postId: string
  comment: IComment
  children: CommentProps[]
  expanded: boolean
  count: number
}
const Comment: FC<CommentProps> = ({ postId, comment, children, expanded, count }) => {
  const [isExpanded, setExpanded] = useState<boolean>(expanded);
  const [canReply, setReplyState] = useState<boolean>(false);
  return <div className="mt-2 mb-4">
    <div className="flex items-center">
      <div className="w-8 h-8 border mr-3 border-gray-300"></div>
      <p>{comment.text}</p>
    </div>
    <div className={`ml-4 pl-4 pt-2 ${isExpanded && count ? 'border-l border-gray-300' : ''}`}>
      {isExpanded ? children.map(c => <Comment {...c} />) : null}
    </div>
    <div className="flex space-x-2 ml-10">
      { count ? <button className="flex items-center" onClick={() => setExpanded(!isExpanded)}>
        { !isExpanded ? `See ${count} replies` : 'Hide replies' }
      </button> : null }
      <button className="flex items-center" onClick={() => setReplyState(!canReply)}>
        <BsReplyFill className="w-6 h-6 mr-1" />
        Reply
      </button>
    </div>
    { canReply ? <CommentForm postId={postId} replyId={comment.id} placeholder="Reply to this comment" /> : null }
  </div>
}

interface CommentFormProps { 
  postId: string,
  replyId?: string
  placeholder: string
}
const CommentForm: FC<CommentFormProps> = ({ postId, replyId, placeholder }) => {

  const { register, watch, handleSubmit } = useForm<Partial<IComment>>({ defaultValues: {} })
  const setError = useErrorService(state => state.setError);
  const comment = watch('text');

  const postComment = async (data: Partial<IComment>) => {
    if (!postId) return;
    try {
      await submitComment(postId, { ...data, replyId });
    } catch (e) {
      setError(e);
    }
  }

  return <form className="flex items-center" onSubmit={handleSubmit(postComment)}>
    <div className="w-8 h-8 mb-2 rounded-full border mr-3 border-gray-300"></div>
    <TextField validationMessage="You need to write your comment before you can post!" register={register} name="text" title=" " placeholder={placeholder} />
    {comment ? <Button className="mb-2 ml-3" type="submit" mode="primary">Submit</Button> : null}
  </form>
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
      const post = await getPost(postId) as IPost;
      setPost(post);

      const graph = new DepGraph();
      post.comments?.forEach(c => { graph.addNode(c.id, c) })
      post.comments?.forEach(c => { if (c.replyId) graph.addDependency(c.replyId, c.id) });

      const commentMagic = (comments: string[], level: number = 0): CommentProps[] => {
        if (!comments || comments.length === 0) return [];
        return comments.map((commentId) => {
          const comment = graph.getNodeData(commentId) as IComment;
          const childComments = graph.directDependenciesOf(commentId);
          const count = graph.dependenciesOf(commentId).length;
          return { comment, children: commentMagic(childComments, level + 1), expanded: level < 1, postId, count }
        })
      }

      const topLevelComments = graph.entryNodes();
      const comments = commentMagic(topLevelComments);
      setComments(comments);
    })()
  }, [postId, setPost, setComments])

  return <Page
    back={{ to: '/conversations', title: 'Back to conversations' }}
    actions={[
      { name: 'Create a new discussion', onClick: () => { } },
      { name: 'A', onClick: () => { } },
      { name: 'B', onClick: () => { } },
      { name: 'C', onClick: () => { } }
    ]}
    loading={!post}
  >
    {post ? <>
      <Card className="p-6 px-8 py-10">
        <Title size="2xl" className="mb-3" tight={false}>{post ? post.title : <Skeleton width="100%" />}</Title>
        <ContentRenderer content={post.text}></ContentRenderer>
        <div className="mt-5 mb-3 pb-6 border-b border-gray-200">
          <PostMetadata postedAt={post.postedAt} identity={post.postedIdentity} personId={post.postedBy} organisationId={post.organisationId}></PostMetadata>
        </div>

        <div className="pb-3">
          <CommentForm postId={postId} placeholder="Add your voice to this conversation" />
        </div>

        {comments.map((c) => <Comment {...c} />)}
      </Card>

    </> : null}
  </Page>;
}

export default Conversation;