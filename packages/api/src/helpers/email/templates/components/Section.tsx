import React, { FC } from 'react';

interface SectionProps {}

export const Section: FC<SectionProps> = ({ children }) => {
  return (
    <div
      style={{
        margin: '25px 0',
        padding: '20px 25px',
        backgroundColor: '#F9F9F9',
        background: '#F9F9F9',
        borderRadius: 8
      }}
    >
      {children}
    </div>
  );
};
