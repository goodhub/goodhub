import { FC } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../generic/Button';
import Posts from './Posts';

export interface FeedProps {}
 
const Feed: FC<FeedProps> = () => {
  return <div className="flex flex-col md:flex-row pb-16">
    <div className="md:w-64 flex flex-col md:mr-8 flex-shrink-0">
      <Button style="primary" className="mb-4"><FiEdit2 className="w-4 h-4 mr-1.5"/>Start a new post</Button>
      <div className="bg-white shadow-sm border border-gray-200 rounded p-5 mb-4 hidden md:block"></div>
      <div className="justify-center hidden md:flex">
        <Link to="/info/privacy">
          <p className="text-gray-700 dark:text-white text-sm">Privacy Policy</p>
        </Link>
      </div>
    </div>
    <Posts></Posts>
  </div>;
}

export default Feed;