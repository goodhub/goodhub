import { Transition } from '@headlessui/react';
import React from 'react';

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

  return state === ModalState.Open ? <div className={`fixed h-screen w-screen flex inset-0 p-0 justify-center ${layout} z-50`}>
      <div onClick={onDismiss} className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black opacity-75 pointer-events-none"></div>
      </div>

      <div className={`fixed sm:relative flex flex-col min-h-screen sm:min-h-0 top-0 sm:top-auto left-0 sm:left-auto z-50 bg-white sm:rounded-lg overflow-hidden shadow-xl transform transition-all ${className}`}>
        <div className={padding}>
          {children}
        </div>
      </div>
    </div> : null
}

export default Modal;