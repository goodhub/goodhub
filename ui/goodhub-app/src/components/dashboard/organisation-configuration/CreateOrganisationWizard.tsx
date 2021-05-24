import { FC, useState } from 'react';
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
import { MultiTextField } from '../../generic/forms/MultiTextField';
import { useErrorService } from '../../../services/error-service';
import { createOrganisation } from '../../../services/organisation-service';
import { useHistory } from 'react-router';
import Spinner from '../../generic/Spinner';
import Navigation from '../../../translations/Navigation';

export interface CreateOrganisationWizardProps {
  modalState: ModalState
  onDismiss: () => void
}

const CreateOrganisationWizard: FC<CreateOrganisationWizardProps> = ({ modalState, onDismiss }) => {

  const setError = useErrorService(state => state.setError);
  const methods = useForm<IOrganisation & { teamMembers: string[] }>({ shouldUnregister: false });
  const [isRedirecting, setRedirectionState] = useState<boolean>(false);
  const history = useHistory();

  const name = methods.watch('name');
  const description = methods.watch('description');
  const teamMembers = methods.watch('teamMembers');

  const submit = async (data: IOrganisation & { teamMembers: string[] }) => {
    try {
      const organisation = await createOrganisation({ ...data, teamMembers: data.teamMembers.filter(Boolean) });
      setRedirectionState(true);
      setTimeout(() => {
        history.push('/me/login', { restore: `/dashboard/${organisation.id}` });
      }, 1000 * 25);
    } catch (e) {
      setError(e)
      onDismiss();
    }
  }

  return <Modal padding="p-0" layout="items-center" state={modalState} onDismiss={onDismiss}>
    <FormProvider {...methods}>
      <form>
        <Wizard
          name={Navigation.actions.registerOrganisation}
          decoration={(className) => <OrganisationDecoration className={className} />}
          introduction={<p>From registered charities and non-profits to individual community projects, you can sign up for an organisation on GoodHub and get started making a difference.</p>}
          onComplete={methods.handleSubmit(submit)}
        >
          <Step id="Organisation basics" validate={['name', 'description', 'contactPhoneNumber', 'contactAddress']}>
            <Title className="mb-2 hidden sm:block" size="xl">Organisation basics</Title>
            <OrganisationBasicsConfiguration />
          </Step>
          <Step id="Choosing your categories" validate={['tags']}>
            <Title className="mb-2 hidden sm:block" size="xl">Choosing your categories</Title>
            <p className="block text-sm font-medium text-gray-700">Which of these categories fits {name}'s primary aims? Choose those that align with your mission: “{description}”.</p>
            <CategoryConfiguration />
          </Step>
          <Step id="Choosing your branding" validate={['brandColors']}>
            <Title className="mb-2 hidden sm:block" size="xl">Choosing your branding</Title>
            <BrandingConfiguration />
          </Step>
          <Step id="Invite other team members">
            {!isRedirecting ? <>
              <Title className="mb-2 hidden sm:block" size="xl">Invite other team members</Title>
              <p className="block text-sm font-medium text-gray-700">You can invite other people to join you at {name} if you want. Don't worry, you can skip this and do it later.</p>
              <MultiTextField
                name="teamMembers"
                placeholder="Enter a valid email"
                register={methods.register}
                setValue={methods.setValue}
                value={teamMembers}
                title="Emails"
              />
            </> : 
            <div className="flex h-full flex-col items-center justify-center">
              <Spinner />
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-4xl font-bold leading-12 tracking-tight text-gray-900">
                  Setting up your organisation
                </h3>
                <div className="my-5 max-w-xl">
                  <p>Give us a moment to set up your new organisation, you will be redirected to your new dashboard shortly. Remember, your organisation won't be verified right away and you might be contacted by one of our team.</p>
                </div>
              </div>
            </div> }
          </Step>
        </Wizard>
      </form>
    </FormProvider>
  </Modal>
}

export default CreateOrganisationWizard;