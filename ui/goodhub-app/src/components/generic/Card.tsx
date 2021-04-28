import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  decoration?: boolean
}

const classNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

const Card: React.FC<CardProps> = ({ children, className, decoration, ...props }) => {

  return <div className={classNames('bg-white shadow-sm sm:rounded-lg', decoration ? 'border-t-4 border-primary-500' : 'border border-gray-200', className)} {...props}>
    { children }
  </div>;
}

export default Card;