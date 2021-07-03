import React, { FC } from 'react';

export interface SkeletonProps {
  width?: number | string
  opacity?: number
  mode?: 'translucent'
}

const getClassNamesForStyle = (style?: 'translucent') => {
  switch (style) {
    case 'translucent':
      return 'bg-white opacity-50'
  
    default:
      return 'bg-gray-200'
  }
}

 
const Skeleton: FC<SkeletonProps> = ({ width, opacity, mode }) => {
  return <span style={{ opacity }}>
    <span style={{ width }} className={`${getClassNamesForStyle(mode)} inline-block animate-pulse-fast duration-200 w-full rounded dark:bg-gray-600`}>
      &zwnj;
    </span>
  </span>;
}

export default Skeleton;