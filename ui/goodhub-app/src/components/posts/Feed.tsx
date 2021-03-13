import { FC, useState } from 'react';
import { FiEdit2, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { IPersonState } from '@strawberrylemonade/goodhub-lib';
import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import { usePersonService } from '../../services/person-service';

import Button from '../generic/Button';
import Posts from './Posts';
import Skeleton from '../generic/Skeleton';
import { NewPostModal } from './NewPostModal';
import { ModalState } from '../generic/Modal';

export interface FeedProps {}
 
const Feed: FC<FeedProps> = () => {

  const authState = useAuthenticationService(state => state.state);
  const personState = usePersonService(state => state.state);

  const [newPostModalState, setNewPostModalState] = useState<ModalState>(ModalState.Closed);

  return <div className="flex flex-col md:flex-row">
    <NewPostModal state={newPostModalState} onDismiss={() => setNewPostModalState(ModalState.Closed)}></NewPostModal>
    <div className="md:w-64 flex flex-col md:mr-8 flex-shrink-0">
      
        { authState === AuthenticationState.Authenticated && personState === IPersonState.Identified
          ? <Button label="new-post-from-feed" mode="primary" className="mb-4" onClick={() => setNewPostModalState(ModalState.Open)}><FiEdit2 className="w-4 h-4 mr-1.5"/>Start a new post</Button>
          : authState === AuthenticationState.Unauthenticated
          ? <Button to="/me/login" mode="primary" className="mb-4"><FiLogIn className="w-4 h-4 mr-1.5"/>Sign in or up to post</Button>
          : <Button mode="primary" className="mb-4"><Skeleton width={140} mode="translucent" opacity={0.2}></Skeleton></Button>
        }

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