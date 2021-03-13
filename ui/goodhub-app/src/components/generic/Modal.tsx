import { Transition } from '@headlessui/react';
import React from 'react';

type ModalProps = {
  state: ModalState
  className?: string
  onDismiss?: () => void
}

export enum ModalState {
  Open,
  Closed
}


const Modal: React.FC<ModalProps> = ({ state, children, onDismiss, className = '' }) => {

  return <Transition
    show={state === ModalState.Open}
    enter="transition ease-out duration-200"
    enterFrom="transform opacity-0"
    enterTo="transform opacity-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100"
    leaveTo="transform opacity-0"
    as={React.Fragment}
  >
    <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-50">
      <div onClick={onDismiss} className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className={`bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all ${className} sm:p-6`}>
        {children}
      </div>
    </div>
  </Transition>
}

export default Modal;