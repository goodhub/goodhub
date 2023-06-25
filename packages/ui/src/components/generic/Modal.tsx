import { Dialog } from '@headlessui/react';
import React, { useRef } from 'react';

type ModalProps = {
  state: ModalState;
  className?: string;
  padding?: string;
  layout?: string;
  onDismiss: () => void;
};

export enum ModalState {
  Open,
  Closed
}

const Modal: React.FC<ModalProps> = ({
  state,
  children,
  onDismiss,
  layout = 'items-center',
  className = '',
  padding = 'px-4 pt-5 pb-4 sm:p-6'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return state === ModalState.Open ? (
    <Dialog
      open={true}
      static={true}
      onClose={() => onDismiss()}
      className={`fixed h-screen h-screen-safe w-screen overflow-scroll flex inset-0 p-0 justify-center ${layout} z-50`}
      initialFocus={buttonRef}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
      <div
        className={`fixed sm:relative flex flex-col sm:min-h-0 top-0 sm:top-auto left-0 sm:left-auto z-50 bg-white sm:rounded-lg overflow-hidden shadow-xl transform transition-all ${className}`}
      >
        <button ref={buttonRef} className="h-0 w-0 overflow-hidden" />
        <div className={padding}>{children}</div>
      </div>
    </Dialog>
  ) : null;
};

export default Modal;
