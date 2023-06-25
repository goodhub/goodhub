import React, { FC } from 'react';

interface FooterProps {}

const Dot = () => (
  <span
    style={{
      color: '#9c9c9c',
      padding: '0px 5px'
    }}
  >
    •
  </span>
);

const Link: FC<{ href: string }> = ({ href, children }) => (
  <a
    href={href}
    style={{
      color: '#4B4B4B',
      fontSize: '12px',
      textDecoration: 'none'
    }}
  >
    {children}
  </a>
);

export const Footer: FC<FooterProps> = () => {
  return (
    <div
      style={{
        margin: '25px 0',
        padding: '20px 25px',
        borderTop: '1px solid #E6E6E6'
      }}
    >
      <div>
        <Link href="https://goodhub.org.uk/info/privacy">Privacy Policy</Link>
        <Dot />
        <Link href="#">Contact</Link>
        <Dot />
        <Link href="https://goodhub.org.uk">Website</Link>
      </div>
      <div
        style={{
          marginTop: '20px'
        }}
      ></div>
    </div>
  );
};
