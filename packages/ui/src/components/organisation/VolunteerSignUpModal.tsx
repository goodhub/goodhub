import { FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { useErrorService } from '../../services/error-service';
import VolunteerDecoration from '../decoration/VolunteerDecoration';
import Modal, { ModalState } from '../generic/Modal';
import Spinner from '../generic/Spinner';
import Title from '../generic/Title';

enum State {
  Loading,
  Idle,
  Successful
}

export interface VolunteerSignUpModalProps {
  organisationName?: string;
  organisationId?: string;
}

const VolunteerSignUpModal: FC<VolunteerSignUpModalProps> = ({ organisationName, organisationId }) => {
  const setError = useErrorService(state => state.setError);
  const [state, setState] = useState<State>(State.Idle);

  const history = useHistory();
  const dismiss = () => history.push(`/organisations/${organisationId}`);

  const signUp = () => {
    (async () => {
      if (!organisationId) return;
      setState(State.Loading);
      try {
        //await volunteerForOrganisation(organisationId);
        setTimeout(() => setState(State.Successful), 1000);
      } catch (e) {
        dismiss();
        setError(e);
      }
    })();
  };

  return (
    <Modal state={ModalState.Open} onDismiss={dismiss} padding="">
      <button onClick={dismiss} className={`m-4 p-2 absolute right-0 top-0 hover:bg-gray-100 rounded-md z-10`}>
        <FiX className={`w-6 h-6 text-gray-700`}></FiX>
      </button>
      <div className="flex flex-col overflow-y-scroll space-y-4 px-8 py-12 items-center text-gray-700 w-screen min-h-screen-safe h-screen sm:h-fit-content sm:max-h-modal sm:max-w-lg">
        <VolunteerDecoration className="w-52" />
        <Title size="3xl">Sign up to volunteer</Title>
        <p className="text-center">
          If you're wanting to get involved, you can make a difference with {organisationName}. GoodHub helps manage
          lists of volunteers to help organisations and protect your privacy.
        </p>
        <ul className="list-disc ml-8 text-sm">
          <li>Your details will be stored securely & encrypted.</li>
          <li>
            You are only consenting to be contacted in relation to volunteering for this specific
            [organisation|project]. You won't get emails or texts about anything else.
          </li>
          <li>You can choose to revoke this consent at any point right here on GoodHub.</li>
        </ul>
        <button
          onClick={signUp}
          className={`flex items-center justify-center leading-6 p-4 px-8 ${
            state !== State.Successful
              ? 'bg-gray-100 hover:bg-primary-200 text-gray-700 hover:text-primary-800'
              : 'bg-primary-500 text-white'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors w-full rounded-md`}
        >
          {(() => {
            if (state === State.Idle)
              return (
                <p>
                  Allow <span className="font-bold">{organisationName}</span> to contact you about volunteering.
                </p>
              );
            if (state === State.Loading) return <Spinner size="8" />;
            if (state === State.Successful)
              return <p className="font-bold">🎉 Success! You are signed up to volunteer at {organisationName}!</p>;
          })()}
        </button>
      </div>
    </Modal>
  );
};

export default VolunteerSignUpModal;
