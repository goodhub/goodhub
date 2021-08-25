import React, { FC } from 'react';

export interface ActionProps {
  type?: string
  active?: boolean
}
 
export const Action: FC<ActionProps> = ({ type, active, children }) => {
  switch (type) {
    case 'card':
    default:
      return <button className={`flex items-center text-gray-700 text-left dark:text-white text-sm px-3 py-2 text rounded-md ${active ? 'font-medium' : ''} hover:font-medium hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-gray-900 cursor-pointer`}>
      { children }
    </button>
  };
}