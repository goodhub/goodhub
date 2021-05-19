import { FC } from 'react';
import { useHistory } from 'react-router';
import Modal, { ModalState } from '../generic/Modal';

export interface VolunteerSignUpModalProps {}
 
const VolunteerSignUpModal: FC<VolunteerSignUpModalProps> = () => {

  const history = useHistory();

  return <Modal state={ModalState.Open} onDismiss={() => history.goBack()}>
    <div className="flex w-screen sm:w-modal h-screen sm:h-4xl sm:max-h-modal sm:max-w-7xl">
      A
    </div>
  </Modal>
}

export default VolunteerSignUpModal;