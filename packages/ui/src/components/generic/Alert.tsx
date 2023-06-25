import { Dialog } from '@headlessui/react';
import React from 'react';

type AlertProps = {
  state: AlertState;
  onDismiss: () => void;
};

export enum AlertState {
  Open,
  Closed
}

const Alert: React.FC<AlertProps> = ({ state, onDismiss }) => {
  return (
    <Dialog
      open={state === AlertState.Open}
      onClose={() => onDismiss()}
      className={`fixed h-screen w-screen overflow-scroll flex inset-0 p-0 justify-center z-50`}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
      <Dialog.Title>Are you sure about that?</Dialog.Title>
    </Dialog>
  );
};

export default Alert;
