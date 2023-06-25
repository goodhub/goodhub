import React, { FC } from 'react';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <div>
      <svg
        style={{
          width: 60,
          height: 60,
          color: '#47b19d'
        }}
        width="60"
        height="60"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="30" cy="30" r="30" fill="currentColor" />
      </svg>

      <table
        className="ms-t1 spacer"
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          height: '20px'
        }}
      >
        <tbody>
          <tr>
            <td width="100%" height="20"></td>
          </tr>
        </tbody>
      </table>
      <h1
        style={{
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          fontSize: '175%',
          marginBottom: 0
        }}
      >
        {title}
      </h1>
      <p
        style={{
          margin: '0 0 10px 0',
          fontSize: '14px',
          lineHeight: '16.3px'
        }}
      >
        {description}
      </p>
    </div>
  );
};
