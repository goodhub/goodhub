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
import Navigation from '../../translations/Navigation';

export interface FeedProps { }

const Feed: FC<FeedProps> = () => {

  const authState = useAuthenticationService(state => state.state);
  const personState = usePersonService(state => state.state);

  const [newPostModalState, setNewPostModalState] = useState<ModalState>(ModalState.Closed);

  return <div className="flex">
    <NewPostModal state={newPostModalState} onDismiss={() => setNewPostModalState(ModalState.Closed)}></NewPostModal>
    <div className="flex flex-col flex-2 pr-0 lg:pr-5">
      <div className="flex flex-col-reverse sm:flex-row justify-between mb-3">
        <div className="mt-3 sm:mt-0">
          <Button className="mr-2">{Navigation.posts.personalised}</Button>
          <Button className="mr-2">{Navigation.posts.popular}</Button>
          <Button>{Navigation.posts.location}</Button>
        </div>
        {authState === AuthenticationState.Authenticated && personState === IPersonState.Identified
          ? <Button label="new-post-from-feed" mode="primary" onClick={() => setNewPostModalState(ModalState.Open)}><FiEdit2 className="w-4 h-4 mr-1.5" />{Navigation.posts.startNewPost}</Button>
          : authState === AuthenticationState.Authenticated && personState === IPersonState.RequiresOnboarding
            ? <Button to="/me/onboarding" label="new-post-from-feed" mode="primary" >{Navigation.auth.setUpYourAccount}</Button>
            : authState === AuthenticationState.Unauthenticated
              ? <Button to="/me/login" mode="primary" ><FiLogIn className="w-4 h-4 mr-1.5" />{Navigation.posts.signUpOrInToPost}</Button>
              : <Button mode="primary" ><Skeleton width={140} mode="translucent" opacity={0.2}></Skeleton></Button>
        }
      </div>
      <Posts></Posts>
    </div>
    <div className="lg:block hidden flex-1">
      <div className="bg-white shadow sm:rounded-lg border-t-4 border-primary-500 mb-6">
        <div className="px-4 py-5 sm:p-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{Navigation.volunteering.opportunitiesToHelp}</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae ad. Amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae ad.</p>
          </div>
          <div className="mt-3 text-sm">
            <Link to="/volunteering" className="font-medium text-primary-600 hover:text-primary-500">
              {Navigation.seeMore} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white shadow sm:rounded-lg border-t-4 border-primary-500">
        <div className="px-4 py-5 sm:p-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{Navigation.conversations.getInvolved}</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae ad.</p>
          </div>
          <div className="mt-3 text-sm">
            <Link to="/volunteering" className="font-medium text-primary-600 hover:text-primary-500">
              {Navigation.seeMore} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Feed;