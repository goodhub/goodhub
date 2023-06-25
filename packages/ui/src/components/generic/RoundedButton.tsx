import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ButtonProps, ButtonStyle } from './Button';

const getClassNamesForStyle = (style?: ButtonStyle) => {
  switch (style) {
    case 'primary':
      return 'border-primary-600 text-white bg-primary-500 hover:bg-primary-600';

    case 'disabled':
      return 'border-gray-300 text-gray-700 bg-gray-100';

    case 'appropriate':
      return 'border-primary-dark text-primary-appropriate bg-primary';

    case 'plain':
    default:
      return 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50';
  }
};

const RoundedButton: FC<ButtonProps> = ({ children, type, mode, to, className, onClick, label }) => {
  const location = useLocation();

  if (type === 'submit') {
    return (
      <button
        disabled={mode === 'disabled'}
        type="submit"
        aria-label={label}
        className={`${className} ${getClassNamesForStyle(
          mode
        )} inline-flex items-center px-3 py-2.5 justify-center border text-sm font-medium rounded-full leading-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer`}
      >
        {children}
      </button>
    );
  }

  if (to) {
    return (
      <Link
        aria-label={label}
        className={`${className} ${getClassNamesForStyle(
          mode
        )} inline-flex items-center px-3 py-2.5 justify-center border text-sm font-medium rounded-full leading-4  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
        to={{ pathname: to, state: { restore: location.pathname } }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={mode === 'disabled'}
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${className} ${getClassNamesForStyle(
        mode
      )} inline-flex items-center px-3 py-2.5 justify-center border text-sm font-medium rounded-full leading-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
