import { FC } from 'react';
import Modal, { ModalState } from '../../generic/Modal';
import Wizard from '../../generic/Wizard';
// import { Step } from 'react-albus';
// import Title from '../../generic/Title';
import { FormProvider, useForm } from 'react-hook-form';
import { IProject } from '../../../../../shared';
import OrganisationDecoration from '../../decoration/OrganisationDecoration';
import { useErrorService } from '../../../services/error-service';
import { createProject, useOrganisationService } from '../../../services/organisation-service';
import { useHistory } from 'react-router';
import { useNotificationService } from '../../../services/notification-service';
import Navigation from '../../../translations/Navigation';

export interface NewProjectWizardProps {
  modalState: ModalState;
  onDismiss: () => void;
}

const NewProjectWizard: FC<NewProjectWizardProps> = ({ modalState, onDismiss }) => {
  const organisation = useOrganisationService(state => state.organisation);
  const setError = useErrorService(state => state.setError);
  const addNotification = useNotificationService(state => state.addNotification);
  const methods = useForm<Partial<IProject>>({ shouldUnregister: false });
  const history = useHistory();

  const submit = async (data: Partial<IProject>) => {
    if (!organisation) return;

    try {
      const project = await createProject(organisation.id, data);
      addNotification('Project was created successfully.');
      history.push(`/dashboard/${organisation.id}/projects/${project.id}`);
    } catch (e) {
      setError(e);
      onDismiss();
    }
  };

  return (
    <Modal padding="p-0" layout="items-center" state={modalState} onDismiss={onDismiss}>
      <FormProvider {...methods}>
        <form>
          <Wizard
            name={Navigation.actions.registerOrganisation}
            decoration={className => <OrganisationDecoration className={className} />}
            introduction={
              <p>
                From registered charities and non-profits to individual community projects, you can sign up for an
                organisation on GoodHub and get started making a difference.
              </p>
            }
            onComplete={methods.handleSubmit(submit)}
          >
            <div></div>
          </Wizard>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default NewProjectWizard;
