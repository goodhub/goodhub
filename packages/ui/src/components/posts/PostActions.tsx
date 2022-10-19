import { IComment } from '../../../../shared';
import { FC, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useErrorService } from '../../services/error-service';

import { likePost } from '../../services/post-service';

export interface PostActionsProps {
  postId: string
  likes: string[]
  comments: IComment[]
  personId?: string
  open?: (postId: string) => void
}

export const PostActions: FC<PostActionsProps> = ({ postId, likes, comments, personId, open }) => {
  const [currentLikes, setLikes] = useState<string[]>(likes)
  const setError = useErrorService(state => state.setError);
  const like = async () => {
    try {
      const post = await likePost(postId);
      setLikes(post.likes ?? []);
    } catch (e) {
      setError(e);
    }
  }
  
  return <div className="flex w-full sm:w-auto items-center mt-2 sm:mt-0 pt-1 sm:pt-0 border-t sm:border-none border-gray-200">
    <button onClick={() => like()} className={`flex flex-1 items-center justify-center text-sm ${currentLikes.includes(personId ?? '') ? 'text-primary-600 font-bold' : 'text-gray-800 font-semibold'} sm:rounded-lg hover:bg-gray-100 sm:mr-1 py-2 px-3`}>
      <AiOutlineLike className={`w-6 h-6 mr-1`} />{currentLikes.length}
  </button>
    <button onClick={() => open?.(postId)} className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 py-2 px-3">
      <FaRegCommentAlt className="w-5 h-5 mt-0.5 mr-2" />{comments.length}
  </button>
  </div>
}