import { FC } from 'react';
import Modal, { ModalState } from '../../generic/Modal';
import Wizard from '../../generic/Wizard';
import { Step } from 'react-albus';
import Title from '../../generic/Title';
import { FormProvider, useForm } from 'react-hook-form';
import { IOrganisation } from '@strawberrylemonade/goodhub-lib';
import OrganisationDecoration from '../../decoration/OrganisationDecoration';
import OrganisationBasicsConfiguration from './forms/OrganisationBasicsConfiguration';
import CategoryConfiguration from './forms/CategoryConfiguration';
import BrandingConfiguration from './forms/BrandingConfiguration';

export interface CreateOrganisationWizardProps {
  modalState: ModalState
  onDismiss: () => void
}

const CreateOrganisationWizard: FC<CreateOrganisationWizardProps> = ({ modalState, onDismiss }) => {

  const methods = useForm<IOrganisation>({ shouldUnregister: false });

  const name = methods.watch('name');
  const description = methods.watch('description');

  const submit = (data: IOrganisation) => {
    
  }

  return <Modal padding="p-0" layout="items-center" state={modalState} onDismiss={onDismiss}>
    <FormProvider {...methods}>
      <form>
        <Wizard
          name="Create an organisation"
          decoration={(className) => <OrganisationDecoration className={className} />}
          introduction={<p>From registered charities and non-profits to individual community projects, you can sign up for an organisation on GoodHub and get started making a difference.</p>}
          onComplete={methods.handleSubmit(submit)}
        >
          <Step id="Organisation basics">
            <Title className="mb-2 hidden sm:block" size="xl">Organisation basics</Title>
            <OrganisationBasicsConfiguration />
          </Step>
          <Step id="Choosing your categories">
            <Title className="mb-2 hidden sm:block" size="xl">Choosing your categories</Title>
            <p className="block text-sm font-medium text-gray-700">Which of these categories fits {name}'s primary aims? Choose those that align with your mission: “{description}”.</p>
            <CategoryConfiguration />
          </Step>
          <Step id="Choosing your branding">
            <Title className="mb-2 hidden sm:block" size="xl">Choosing your branding</Title>
            <BrandingConfiguration />
        </Step>
          <Step id="Invite other team members">
            <Title className="mb-2 hidden sm:block" size="xl">Invite other team members</Title>
        </Step>
        </Wizard>
      </form>
    </FormProvider>
  </Modal>
}

export default CreateOrganisationWizard;