import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';

type ModalProps = {
  state: ModalState
  className?: string
  padding?: string
  layout?: string
  onDismiss?: () => void
}

export enum ModalState {
  Open,
  Closed
}

const Modal: React.FC<ModalProps> = ({ state, children, onDismiss, layout = 'items-center', className = '', padding = 'px-4 pt-5 pb-4 sm:p-6' }) => {

  useEffect(() => {
    if (state === ModalState.Open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [state]);

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
    <div className={`fixed h-screen w-screen overflow-scroll flex inset-0 p-0 justify-center ${layout} z-50`}>
      <div onClick={onDismiss} className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-75 pointer-events-none"></div>
      </div>

      <div className={`fixed sm:relative flex flex-col min-h-screen sm:min-h-0 top-0 sm:top-auto left-0 sm:left-auto z-50 bg-white sm:rounded-lg overflow-hidden shadow-xl transform transition-all ${className}`}>
        <div className={padding}>
          {children}
        </div>
      </div>
    </div>
  </Transition>
}

export default Modal;