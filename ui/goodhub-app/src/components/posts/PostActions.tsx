import { FC } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';

export interface PostActionsProps {

}

export const PostActions: FC<PostActionsProps> = () => {
  return <div className="flex w-full sm:w-auto items-center mt-4 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-none border-gray-200">
    <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 sm:mr-1 py-2 px-3">
      <AiOutlineLike className="w-6 h-6 mr-1" />101
  </button>
    <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 py-2 px-3">
      <FaRegCommentAlt className="w-5 h-5 mt-0.5 mr-2" />15
  </button>
  </div>
}