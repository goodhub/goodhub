import { IProject } from '@strawberrylemonade/goodhub-lib';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProject } from '../../../services/organisation-service';

import Button from '../../generic/Button';
import Error from '../../error/Error';
import { TextField } from '../../generic/forms/TextField';
import Modal, { ModalState } from '../../generic/Modal';

export interface CreateProjectModalProps {
  orgId: string
  state: ModalState
  onDismiss: () => void
}

interface CreateProjectFields {
  name: string
  description: string
}

enum Status {
  Idle,
  Loading
}

export const CreateProjectModal: FC<CreateProjectModalProps> = ({ state, orgId, onDismiss }) => {

  const {register, handleSubmit, errors } = useForm<CreateProjectFields>();
  const [status, setStatus] = useState<Status>(Status.Idle)
  const [error, setError] = useState<string>()


  const submit = async (data: CreateProjectFields) => {
    const project: Partial<IProject> = {
      name: data.name,
      description: data.description
    }

    setError(undefined);
    setStatus(Status.Loading);

    try {
      await createProject(orgId, project);
      setStatus(Status.Idle);
      onDismiss();
    } catch (e) {
      setStatus(Status.Idle);
      setError(e.message);
    }
  }

  return <Modal  className="max-w-xl w-full" state={state} onDismiss={onDismiss}>
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
      <h1 className="text-xl mb-4 leading-6 font-semibold text-gray-900">Create a new project</h1>
      {error ? <Error message={error} /> : null}
      <TextField register={register} name="name" validationFailed={errors.name} validationMessage="A name is required to make a project" placeholder="The name of your new project"></TextField>
      <TextField register={register} name="description" validationFailed={errors.description} validationMessage="A description is required to make a project" placeholder="A brief description of your new project"></TextField>
      <div className="flex justify-end">
        <Button onClick={onDismiss} className="mr-4">Dismiss</Button>
        <Button mode={status === Status.Loading ? 'disabled' : 'primary'} type="submit">
          {'Submit'}
        </Button>
      </div>
    </form>
  </Modal>
}