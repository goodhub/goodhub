import { FC } from 'react';
import { Link } from 'react-router-dom';

import Posts from './Posts';
import Navigation from '../../translations/Navigation';
import Card from '../generic/Card';

export interface FeedProps { }

const Feed: FC<FeedProps> = () => {

  return <div className="flex">

    <div className="flex flex-col flex-2 pr-0 lg:pr-5">
      {/* <div className="flex flex-col-reverse sm:flex-row justify-between mb-3">
        <div className="mt-3 sm:mt-0">
          <Button className="mr-2" mode="primary">
            <RiStarFill className="mr-1 h-5 w-5"/>
            {Navigation.posts.popular}
          </Button>
          {authState === AuthenticationState.Authenticated && personState === IPersonState.Identified
            ? <Button className="mr-2">
              <RiUser2Fill className="mr-1 h-5 w-5"/>
              {Navigation.posts.personalised}
            </Button> : null }
        </div>
      </div> */}
      <Posts></Posts>
    </div>
    <div className="lg:block hidden flex-1">
      <Card className="mb-5">
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
      </Card>
      <Card className="mb-5">
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
      </Card>
    </div>
  </div>;
}

export default Feed;