import { useForm } from 'react-hook-form';
import Button from '../generic/Button';
import { BsReply } from 'react-icons/bs';
import { v4 } from 'uuid';
import { getPerson } from '../../services/person-service';
import { TextAreaField } from '../generic/forms/TextAreaField';
import { FiFlag, FiMoreHorizontal } from 'react-icons/fi';
import { submitComment, usePostService, CacheStatus } from '../../services/post-service';
import { useErrorService } from '../../services/error-service';
import { usePersonService } from '../../services/person-service';
import { IComment, IPostIdentity } from '../../types';
import { FC, useEffect, useState } from 'react';
import Skeleton from '../generic/Skeleton';
import { Menu } from '@headlessui/react';



export interface CommentProps {
  postId: string
  comment: IComment
  children: CommentProps[]
  level: number
  count: number
  onSubmit?: () => void
}
export const Comment: FC<CommentProps> = ({ postId, comment, children, level, count, onSubmit }) => {
  const [isExpanded, setExpanded] = useState<boolean>(level < 1);
  const [canReply, setReplyState] = useState<boolean>(false);

  const [
    person, addPersonToCache, initiatedPersonLookup,
  ] = usePostService(state =>
    [state.people[comment.postedBy], state.addPersonToCache, state.initiatedPersonLookup])

  const [currentId] = useState(v4())

  useEffect(() => {
    (async () => {

      if (!person?.status) {
        // The person is not available in the cache and will be requested
        // This will not override if another actor has already requested to
        // complete the task
        initiatedPersonLookup(comment.postedBy, currentId)
        return;
      }

      if (person.status === CacheStatus.Retrieved) {
        // The person is retrieved and can be used
        return;
      }

      if (person.status === CacheStatus.Loading && person.loader !== currentId) {
        // This component is aware the person is being loaded but they are not responsible
        return;
      }

      // This component responsible and are getting the person
      const response = await getPerson(comment.postedBy);
      addPersonToCache(response);
    })()
  }, [person, currentId, comment.postedBy, addPersonToCache, initiatedPersonLookup])

  const reportComment = async (commentId: string) => {
    console.log(commentId);
  }

  return <div className={`w-full mt-2 ${level === 0 ? 'mb-4': ''}`}>
    <div className="flex items-start relative">
      <div className="flex">
        <div className={`mt-1 w-8 h-8 z-10 border overflow-hidden border-gray-300 ${comment.postedIdentity !== IPostIdentity.Organisation ? 'rounded-full' : 'rounded-lg'} mr-3`}>
          {comment.postedIdentity === IPostIdentity.Organisation ? <div></div>
            : person?.cache?.profilePicture ? <img src={person?.cache?.profilePicture.thumbnail} alt={person?.cache?.profilePicture.alt} /> : null}
        </div>
        {isExpanded && count ? <div style={{ height: 'calc(100% - 2rem)' }} className={`absolute top-4 left-4 -ml-px w-0.5 bg-gray-200`}></div> : null}
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-gray-800 mr-1">
            {comment.postedIdentity !== IPostIdentity.Organisation
              ? person?.cache ? `${person?.cache?.firstName} ${person?.cache?.lastName}` : <Skeleton width={100} />
              : null}
          </p>
          <Menu as="div" className="relative inline-block text-left text-sm">
            <Menu.Button className="px-1 hover:bg-gray-50 rounded-lg">
              <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
            </Menu.Button>
            <Menu.Items className="origin-top-right absolute right-0 mt-1 w-max-content rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <button onClick={() => reportComment(comment.id)} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50">
                  <FiFlag className="mr-2" />
                  Report
                  </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
        {comment.text.split('\n').map(t => <p>{t}</p>)}
        <div className="flex space-x-2 text-sm text-gray-500">
          <button className="flex items-center" onClick={() => setReplyState(!canReply)}>
            <BsReply className="w-6 h-6 mr-1" />
            Reply
          </button>
          {count ? <button className="flex items-center" onClick={() => setExpanded(!isExpanded)}>
            {!isExpanded ? `See ${count} replies` : 'Hide replies'}
          </button> : null}
        </div>
        {canReply ? <CommentForm onSubmit={() => { setReplyState(false); onSubmit?.() }} postId={postId} replyId={comment.id} placeholder="Reply to this comment" /> : null}
        {isExpanded ? children.map(c => <Comment onSubmit={onSubmit} {...c} />) : null}
      </div>
    </div>
  </div>
}

interface CommentFormProps {
  postId: string
  replyId?: string
  placeholder: string
  onSubmit?: () => void
}
export const CommentForm: FC<CommentFormProps> = ({ postId, replyId, placeholder, onSubmit }) => {

  const { register, watch, handleSubmit, reset } = useForm<Partial<IComment>>({ defaultValues: {} })
  const person = usePersonService(state => state.person)
  const setError = useErrorService(state => state.setError);
  const comment = watch('text');
  

  const postComment = async (data: Partial<IComment>) => {
    if (!postId) return;
    try {
      await submitComment(postId, { ...data, replyId });
      reset()
      onSubmit?.();
    } catch (e) {
      setError(e);
    }
  }

  const rows = comment?.split('\n').length ?? 1;
  console.log(rows);

  return <form className="flex items-start" onSubmit={handleSubmit(postComment)}>
    <div className="w-8 h-8 mb-2 mt-1 rounded-full border mr-3 overflow-hidden border-gray-300">
      {person?.profilePicture ? <img src={person?.profilePicture.thumbnail} alt={person?.profilePicture.alt} /> : null}
    </div>
    <TextAreaField rows={rows} validationMessage="You need to write your comment before you can post!" register={register} name="text" title=" " placeholder={placeholder} />
    {comment ? <Button className="mb-2 mt-1 ml-3" type="submit" mode="primary">Submit</Button> : null}
  </form>
}