import { FC, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useOrganisationService } from '../../services/organisation-service';
import Navigation from '../../translations/Navigation';
import { ModalState } from '../generic/Modal';
import Page from '../generic/Page';
import { NewPostModal } from '../posts/NewPostModal';
import Posts from '../posts/Posts';

export interface OrganisationFeedProps {}

const OrganisationFeed: FC<OrganisationFeedProps> = () => {

  const [newPostModalState, setNewPostModalState] = useState<ModalState>(ModalState.Closed);
  const organisation = useOrganisationService(state => state.organisation);

  return <Page
    title={organisation ? organisation?.name + " " + Navigation.menu.feed : Navigation.menu.feed }
    actions={[
      { name: <><FiEdit2 className="w-4 h-4 mr-1.5" />{Navigation.posts.startNewPost}</>, 
      onClick: () => setNewPostModalState(ModalState.Open) }
    ]}
  >
    <NewPostModal orgId={organisation?.id} state={newPostModalState} onDismiss={() => setNewPostModalState(ModalState.Closed)} />
    { organisation ? <Posts orgId={organisation.id} columns={2} /> : organisation }
  </Page>;
}

export default OrganisationFeed;