import React, { FC, HTMLAttributes, ReactNode, useState } from 'react';
import { Transition } from '@headlessui/react';

export interface DropdownProps {
  button: (open: boolean) => ReactNode
  actions?: ReactNode
  children?: ReactNode
}

export const Action: FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return <button {...props} className={`flex w-full items-center text-gray-700 dark:text-white text-sm px-3 py-2 text rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-gray-900 cursor-pointer`}>
    { children }
  </button>
}

export const Dropdown: FC<DropdownProps> = ({ button, actions, children }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <div className="relative inline-block text-left">
    <button onClick={() => setIsOpen(!isOpen)}>{button(isOpen)}</button>
    <Transition
      show={isOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className={`origin-top-right absolute right-0 mt-2 p-2 rounded-md shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white z-20 border border-gray-200`}>
        { children }
        { actions ? <div onClick={() => setIsOpen(false)} className={`${children && actions ? 'border-t border-gray-200 dark:border-gray-600 pt-2' : ''}`}>
          { actions }
        </div> : null }
      </div>
    </Transition>
  </div>
}