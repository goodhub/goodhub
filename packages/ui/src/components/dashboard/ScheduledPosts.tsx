import { FC, useEffect, useState } from 'react';
import { IExtendedOrganisation, IPost } from '../../types';
import { getColleague } from '../../services/person-service';
import { useNotificationService } from '../../services/notification-service';
import { getScheduledPostsByOrganisationId, publishPost } from '../../services/post-service';
import { ModalState } from '../generic/Modal';
import Table, { HeadingType } from '../generic/Table';
import CreateUpdatePostWizard from '../posts/2.0/CreateUpdatePostWizard';
import { v4 } from 'uuid';

export interface ScheduledPostsProps {
  organisation?: IExtendedOrganisation
}

const ScheduledPosts: FC<ScheduledPostsProps> = ({ organisation }) => {
  const [editPostToEdit, setEditPost] = useState<IPost>();
  const [eTag, setETag] = useState<string>(v4());
  const [posts, setPosts] = useState<(IPost & { snippet?: string, author?: string })[]>();
  const addNotification = useNotificationService(state => state.addNotification)

  useEffect(() => {
    (async () => {
      if (!organisation) return;
      const posts = await getScheduledPostsByOrganisationId(organisation.id);
      setPosts(await Promise.all(posts.map(async (post: IPost & { snippet?: string, author?: string }) => {
        const person = await getColleague(post.postedBy)
        post.author = `${person.firstName} ${person.lastName}`
        post.snippet = post.text.blocks[0].text.slice(0, 60) + '...';
        return post;
      })));
    })()
  }, [organisation, eTag])

  return posts && posts?.length ? <div className="mb-3">
    <CreateUpdatePostWizard organisation={organisation} existingPost={editPostToEdit} modalState={editPostToEdit ? ModalState.Open : ModalState.Closed} onDismiss={() => setEditPost(undefined)} />
    <div className="flex justify-between items-center mb-2">
    </div>
    <Table
      title="Scheduled Posts"
      placeholder="You don't have any ScheduledPosts at the moment"
      headings={[
        { name: 'author', type: HeadingType.Text },
        { name: 'snippet', type: HeadingType.Text },
        { name: 'scheduledDate', title: 'Date', type: HeadingType.Day },
        { name: 'scheduledDate', title: 'Time', type: HeadingType.Time }
      ]}
      actions={[
        { name: 'Edit', onClick: (id: string) => setEditPost(posts.find((post) => post.id === id)) },
        { name: 'Post now', onClick: async (id: string) => {
          await publishPost(id)
          setETag(v4())
          addNotification('Successfully posted post')
        }}
      ]}
      content={posts}
    />
  </div> : null
}

export default ScheduledPosts;