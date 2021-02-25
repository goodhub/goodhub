import React, { FC } from 'react';

export interface SkeletonProps {
  width?: number
  opacity?: number
}
 
export const Skeleton: FC<SkeletonProps> = ({ width, opacity }) => {
  return <span style={{ opacity }}>
    <span style={{ width }} className="inline-block animate-pulse-fast duration-200 w-full bg-gray-200 rounded dark:bg-gray-600">
      &zwnj;
    </span>
  </span>;
}