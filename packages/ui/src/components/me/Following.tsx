import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useErrorService } from '../../services/error-service';
import { getOrganisation } from '../../services/organisation-service';
import { followOrganisation, usePersonService } from '../../services/person-service';
import Page from '../generic/Page';
import Table, { HeadingType } from '../generic/Table';

interface FollowingRowProps {
  id: string;
  type: 'Organisation' | 'Project';
  name: string;
}

export interface FollowingProps {}
const Following: FC<FollowingProps> = () => {
  const [person, setPerson] = usePersonService(state => [state.person, state.setPerson]);
  const setError = useErrorService(state => state.setError);
  const [following, setFollowing] = useState<FollowingRowProps[]>();

  const history = useHistory();

  const unfollowOrganisation = async (organisationId: string) => {
    try {
      const person = await followOrganisation(organisationId);
      setPerson(person);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    (async () => {
      //@ts-ignore
      setFollowing(person.following);
      //@ts-ignore
      const following = await Promise.all<FollowingRowProps>(
        person.following.map(async entity => {
          const { name } = await getOrganisation(entity.id);
          return { ...entity, name };
        })
      );
      setFollowing(following);
    })();
  }, [person]);

  return (
    <Page title="Following">
      <Table
        headings={[
          { name: 'name', type: HeadingType.Text },
          { name: 'type', type: HeadingType.Tag }
        ]}
        content={following}
        placeholder="You don't currently follow any organisation or projects"
        onClick={id => history.push(`/organisations/${id}`)}
        actions={[{ name: 'Unfollow', onClick: unfollowOrganisation }]}
      />
    </Page>
  );
};

export default Following;
