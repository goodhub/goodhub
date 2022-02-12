import React, { HTMLAttributes } from 'react';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  msize?: string
  size?: string
  weight?: string
  tight?: boolean
}

const classNames = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

const Title: React.FC<TitleProps> = ({ children, className, msize = '3xl', size = '4xl', tight = false, weight = 'bold', ...props }) => {

  // text-sm text-lg text-base text-xl text-2xl text-3xl change to make small screen smaller
  return <h1 className={classNames(`text-${msize} md:text-${size}`, (size.includes('xl') && tight) || tight ? 'tracking-tight' : '', `font-${weight}`, className)} {...props}>
    { children }
  </h1>;
}

export default Title;