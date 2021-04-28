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

  return <Modal padding="flex flex-col sm:max-h-modal" state={modalState} onDismiss={onDismiss}>
    <form>
      <Wizard
        name="Create an organisation"
        decoration={<OrganisationDecoration />}
        introduction={<>
          <p>From registered charities and non-profits to individual community projects, you can sign up for an organisation on GoodHub and get started making a difference.</p>
          <div className="flex mt-6">
            <div className="flex justify-center items-center bg-primary-200 p-5 rounded-lg mr-5">
              <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25.6123" y="17.4243" width="6.21097" height="20.2059" fill="#327266" />
                <path d="M25.6127 37.6303H5.85156V17.4609H25.6127V37.6303Z" fill="#47B19D" />
                <path d="M18.7729 1.02979C12.8589 1.02979 8.04753 6.00116 8.04753 12.1127V16.5453H6.39803C5.48782 16.5468 4.74707 17.3107 4.74707 18.2513V37.0079C4.74707 37.9469 5.48782 38.7124 6.39657 38.7124H31.1492C32.0579 38.7124 32.7987 37.9469 32.7987 37.0079V18.2513C32.7987 17.3107 32.0579 16.5468 31.1492 16.5468H29.4997V12.1142C29.4982 6.00151 24.6873 1.02979 18.7729 1.02979ZM18.7729 2.73427C23.7769 2.73427 27.8489 6.94195 27.8489 12.1128V16.5454H26.1994V12.1128C26.1979 7.88266 22.8668 4.44022 18.7732 4.44022C14.6796 4.44022 11.3482 7.88235 11.3482 12.1128V16.5454H9.69868V12.1128C9.69721 6.94195 13.7689 2.73427 18.7729 2.73427ZM18.7729 6.1447C21.9579 6.1447 24.5481 8.82143 24.5481 12.1124V16.5451H12.9973V12.1124C12.9973 8.82128 15.5881 6.1447 18.7729 6.1447ZM6.39661 18.251H24.5481V37.0076H6.39661V18.251ZM26.1976 18.251H31.1473V37.0076H26.1976V18.251Z" fill="#111827" />
              </svg>
            </div>
            <div className="flex items-start text-left flex-col">
              <h3 className="font-semibold">Data check</h3>
              <p className="text-sm">Any time you are inputting any personal data into GoodHub, there will always be a data check lock that you can click on to see more information about why we’re collecting it and how we’ll keep it safe.</p>
            </div>
          </div>
        </>}
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