import { FC } from 'react';
import Modal, { ModalState } from '../../generic/Modal';
import Wizard from '../../generic/Wizard';
import { Step } from 'react-albus';
import Title from '../../generic/Title';
import { useForm } from 'react-hook-form';
import { IOrganisation } from '@strawberrylemonade/goodhub-lib';
import OrganisationDecoration from '../../decoration/OrganisationDecoration';
import OrganisationBasics from './forms/OrganisationBasics';
import ChoosingCategories from './forms/ChoosingCategories';

export interface CreateOrganisationWizardProps {
  modalState: ModalState
  onDismiss: () => void
}

const CreateOrganisationWizard: FC<CreateOrganisationWizardProps> = ({ modalState, onDismiss }) => {

  const { register, handleSubmit, errors, watch, setValue } = useForm<IOrganisation>({ shouldUnregister: false });

  const description = watch('description');
  console.log(description);

  const submit = (data: any) => {
    console.log(data);
  }

  return <Modal padding="p-0" state={modalState} onDismiss={onDismiss}>
    <form>
      <Wizard
        name="Create an organisation"
        decoration={(className) => <OrganisationDecoration className={className} />}
        introduction={<p>From registered charities and non-profits to individual community projects, you can sign up for an organisation on GoodHub and get started making a difference.</p>}
        onComplete={handleSubmit(submit)}
      >
        <Step id="Organisation basics">
          <Title className="mb-2 hidden sm:block" size="xl">Organisation basics</Title>
          <OrganisationBasics register={register} errors={errors} />
        </Step>
        <Step id="Choosing your categories">
          <Title className="mb-2 hidden sm:block" size="xl">Choosing your categories</Title>
          <p className="block text-sm font-medium text-gray-700">Which of these categories fits your organisations primary aims? Choose those that align with your mission: “{description}”.</p>
          <ChoosingCategories register={register} errors={errors} setValue={setValue}></ChoosingCategories>
        </Step>
        <Step id="Choosing your branding">
          Step 2
        </Step>
        <Step id="Invite other team members">
          Step 2
        </Step>
      </Wizard>
    </form>
  </Modal>
}

export default CreateOrganisationWizard;