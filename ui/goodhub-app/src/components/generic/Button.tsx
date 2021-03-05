import { FC, HTMLAttributes } from 'react';

type ButtonStyle = 'primary';

export interface ButtonProps {
  type?: 'submit'
  mode?: ButtonStyle
  className?: string
}

const getClassNamesForStyle = (style?: ButtonStyle) => {
  switch (style) {
    case 'primary':
      return 'border-green-600 text-white bg-green-500 hover:bg-green-600'
  
    default:
      return 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
  }
}
 
const Button: FC<ButtonProps> = ({ children, type, mode, className }) => {
  return type === 'submit' 
  ? <input type="submit" value={children as string} className={`${className} ${getClassNamesForStyle(mode)} inline-flex items-center px-3 py-2.5 border justify-center shadow-sm text-sm leading-4 font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer`} />
  : <button type="button" className={`${className} ${getClassNamesForStyle(mode)} inline-flex items-center px-3 py-2.5 border justify-center shadow-sm text-sm leading-4 font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}>
    { children }
  </button>;
}

export default Button;