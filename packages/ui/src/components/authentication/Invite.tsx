import { FC, ReactNode, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getInvite, acceptInviteById } from '../../services/organisation-service';
import { FiMail } from 'react-icons/fi';
import Button from '../generic/Button';
import Spinner from '../generic/Spinner';
import { usePersonService } from '../../services/person-service';
import { IPersonState } from '../../../../shared';
import { useErrorService } from '../../services/error-service';

export interface InviteProps {}

export interface InviteParams {
  id: string;
}

enum InviteState {
  Idle,
  Loading,
  Complete
}
const contentForInviteState = (inviteState: InviteState, invite?: any): (string | ReactNode)[] => {
  if (inviteState === InviteState.Complete) return ['Please log in again to ensure maximum security'];
  switch (invite?.status) {
    case 'Pending':
      return [
        'Welcome!',
        `You have been invited to an organisation here on GoodHub! You're only one step away from making a difference, please sign in, create an account or accept the invite below.`
      ];
    case 'Redeemed':
      return [
        'Already been redeemed',
        `You have already redeemed this invite. If you aren't part of the organisation, you may have been removed. Please request a new invite from the organisation.`
      ];
    case 'Revoked':
      return [
        'Invite has been revoked',
        `This invite has been revoked. If you still need access, please request a new invite from the organisation.`
      ];
    default:
      return [];
  }
};

const Invite: FC<InviteProps> = () => {
  const { id } = useParams<InviteParams>();
  const [inviteState, setInviteState] = useState<InviteState>(InviteState.Loading);
  const [invite, setInvite] = useState<any>();

  const personState = usePersonService(state => state.state);
  const setError = useErrorService(state => state.setError);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const invite = await getInvite(id);
        setInvite(invite);
        setInviteState(InviteState.Idle);
      } catch (e) {
        setError(e);
      }
    })();
  }, [id, setInvite, setInviteState, setError, personState]);

  const acceptInvite = async () => {
    if (!invite) return;
    setInviteState(InviteState.Loading);
    try {
      await acceptInviteById(invite.id);
      setInviteState(InviteState.Complete);
      setTimeout(() => history.push('/me/login', { restore: `/dashboard/${invite.organisationId}` }), 1500);
    } catch (e) {
      setError(e);
    }
  };

  const [title, content] = contentForInviteState(inviteState, invite);

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col sm:justify-center p-6 items-center bg-white z-50">
      {inviteState !== InviteState.Loading ? (
        <>
          <div className="m-8 sm:m-0 sm:-mt-8 w-full max-w-xl">
            <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-50`}>
              <FiMail className="h-6 w-6 text-primary-400" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-4xl font-bold leading-12 tracking-tight text-gray-900">{title}</h3>
              {content ? (
                <div className="my-5">
                  <p>{content}</p>
                </div>
              ) : null}
            </div>
          </div>
          {invite?.status === 'Pending' && inviteState !== InviteState.Complete ? (
            <div className="sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
              {personState === IPersonState.Identified ? (
                <Button onClick={() => acceptInvite()}>Accept invite</Button>
              ) : (
                <Button to="/me/login">Login or sign up</Button>
              )}
            </div>
          ) : null}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Invite;
