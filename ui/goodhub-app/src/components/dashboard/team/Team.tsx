import { IOrganisation, IPerson } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import { useErrorService } from '../../../services/error-service';
import { getInvitesForOrganisation, revokeInviteById, removeMemberById, useOrganisationService } from '../../../services/organisation-service';
import { getPerson } from '../../../services/person-service';
import { ModalState } from '../../generic/Modal';
import Page from '../../generic/Page';
import Table, { HeadingType } from '../../generic/Table';
import { InviteTeamMemberModal } from './InviteTeamMemberModal';

export interface TeamProps { }

const Team: FC<TeamProps> = () => {

  const [organisation] = useOrganisationService(state => [state.organisation]);
  const [teamMembers, setTeamMembers] = useState<Partial<IPerson>[]>()
  const [invites, setInvites] = useState<any[]>()

  const [inviteModalState, setInviteModalState] = useState<ModalState>(ModalState.Closed)
  const setError = useErrorService(state => state.setError);

  const getInvites = async (orgId: string) => {
    setInvites(undefined);
    try {
      const invites = await getInvitesForOrganisation(orgId);
      setInvites(invites);
    } catch (e) {
      setError(e);
    }
  }

  const revokeInvite = async (inviteId: string) => {
    if (!organisation) return;
    await revokeInviteById(inviteId);
    getInvites(organisation.id);
  }

  const getMembers = async (organisation: IOrganisation) => {
    setInvites(undefined);
    try {
      const teamMembers = await Promise.all(organisation.people.map(id => getPerson(id)));
      setTeamMembers(teamMembers);
    } catch (e) {
      setError(e);
    }
  }

  const removeMember = async (personId: string) => {
    if (!organisation) return;
    await removeMemberById(organisation.id, personId);
    getInvites(organisation.id);
  }

  useEffect(() => {
    (async () => {
      if (!organisation) return;
      setTeamMembers(organisation.people.map(p => ({ id: p })));

      getInvites(organisation.id);
      getMembers(organisation);
    })()

  }, [organisation, getInvites, getMembers])

  return <Page
    title="Team"
    actions={[
      {
        name: 'Invite someone',
        onClick: () => setInviteModalState(ModalState.Open)
      }
    ]}
  >
    {organisation ? <InviteTeamMemberModal orgId={organisation?.id} state={inviteModalState} onDismiss={() => { setInviteModalState(ModalState.Closed); getInvites(organisation.id) }}></InviteTeamMemberModal> : null}
    <Table
      className="mb-6" title="Invites"
      headings={[
        { name: 'email', type: HeadingType.Text },
        { name: 'createdAt', type: HeadingType.Date }
      ]}
      content={invites} placeholder="No pending invites"
      actions={[
        { name: 'Revoke', onClick: (id) => revokeInvite(id) }
      ]}
    />
    <Table
      title="Team members"
      content={teamMembers}
      placeholder="No team members"
      headings={[
        { name: 'firstName', type: HeadingType.Text },
        { name: 'lastName', type: HeadingType.Text },
        { name: 'email', type: HeadingType.Text }
      ]}
      actions={[
        { name: 'Remove', onClick: (id) => removeMember(id) }
      ]}
    />
  </Page>;
}

export default Team;