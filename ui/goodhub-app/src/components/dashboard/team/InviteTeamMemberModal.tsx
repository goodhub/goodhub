import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { inviteTeamMember } from '../../../services/organisation-service';

import Button from '../../generic/Button';
import Error from '../../error/Error';
import { TextField } from '../../generic/forms/TextField';
import Modal, { ModalState } from '../../generic/Modal';

export interface InviteTeamMemberModalProps {
  orgId: string
  state: ModalState
  onDismiss: () => void
}

interface InviteTeamMemberFields {
  email: string
}

enum Status {
  Idle,
  Loading
}

export const InviteTeamMemberModal: FC<InviteTeamMemberModalProps> = ({ state, orgId, onDismiss }) => {

  const { register, handleSubmit, errors } = useForm<InviteTeamMemberFields>();
  const [status, setStatus] = useState<Status>(Status.Idle)
  const [error, setError] = useState<string>()
  
  const submit = async (data: InviteTeamMemberFields) => {
    const invite = {
      email: data.email
    }

    setError(undefined);
    setStatus(Status.Loading);

    try {
      await inviteTeamMember(orgId, invite);
      setStatus(Status.Idle);
      onDismiss();
    } catch (e) {
      setStatus(Status.Idle);
      setError(e.message);
    }
  }

  return <Modal className="max-w-xl w-full" state={state} onDismiss={onDismiss}>
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
      <h1 className="text-xl mb-4 leading-6 font-semibold text-gray-900">Invite a new team member</h1>
      {error ? <Error message={error} /> : null}
      <TextField register={register} name="email" validationFailed={errors.email} validationMessage="Email is required to invite a team member" placeholder="The email of the person you'd like to invite"></TextField>
      <div className="flex justify-end">
        <Button onClick={onDismiss} className="mr-4">Dismiss</Button>
        <Button mode={status === Status.Loading ? 'disabled' : 'primary'} type="submit">
          {'Submit'}
        </Button>
      </div>
    </form>
  </Modal>
}