import React, { HTMLAttributes } from 'react';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: string
  weight?: string
  tight?: boolean
}

const classNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

const Title: React.FC<TitleProps> = ({ children, className, size = '4xl', tight = true, weight = 'bold', ...props }) => {

  return <h1 className={classNames(`text-${size}`, size.includes('xl') && tight ? 'tracking-tight' : '', `font-${weight}`, className)} {...props}>
    { children }
  </h1>;
}

export default Title;