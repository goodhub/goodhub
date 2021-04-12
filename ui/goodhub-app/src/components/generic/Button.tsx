import { FC } from 'react';
import { Link } from 'react-router-dom';

export type ButtonStyle = 'primary' | 'disabled' | 'appropriate' | 'plain';

export interface ButtonProps {
  label?: string
  type?: 'submit'
  to?: string
  mode?: ButtonStyle
  onClick?: () => void
  className?: string
}

const getClassNamesForStyle = (style?: ButtonStyle) => {
  switch (style) {
    case 'primary':
      return 'border-mint-600 text-white bg-mint-500 hover:bg-mint-600'
  
    case 'disabled':
      return 'border-gray-300 text-gray-700 bg-gray-100'

    case 'appropriate':
      return 'border-primary-dark text-primary-appropriate bg-primary'

    case 'plain':
    default:
      return 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
  }
}
 
const Button: FC<ButtonProps> = ({ children, type, mode, to, className, onClick, label }) => {

  if (type === 'submit') {
    return <button disabled={mode === 'disabled'} type="submit" aria-label={label} className={`${className} ${getClassNamesForStyle(mode)} inline-flex items-center px-3 py-2.5 border justify-center shadow-sm text-sm leading-4 font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer`}>
      { children }
    </button>
  }

  if (to) {
    return <Link aria-label={label} className={`${className} ${getClassNamesForStyle(mode)} inline-flex items-center px-3 py-2.5 border justify-center shadow-sm text-sm leading-4 font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`} to={to}>
      { children }
    </Link>
  }
  
  return <button disabled={mode === 'disabled'} type="button" aria-label={label} onClick={onClick} className={`${className} ${getClassNamesForStyle(mode)} inline-flex items-center px-3 py-2.5 border justify-center shadow-sm text-sm leading-4 font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}>
    { children }
  </button>;
}

export default Button;