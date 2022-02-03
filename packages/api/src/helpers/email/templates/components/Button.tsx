import React, { FC } from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLTableElement> {
  title: string;
  link: string;
}

export const Button: FC<ButtonProps> = ({ title, link, style, ...props }) => {
  return (
    <table
      {...props}
      className="ms-t1 btn btn-primary btn-md btn-rect"
      cellPadding="0"
      cellSpacing="0"
      role="presentation"
      style={{
        borderRadius: 5,
        overflow: "hidden",
        width: "100%",
        letterSpacing: "0px",
        borderCollapse: "separate",
        ...style,
      }}
    >
      <tbody>
        <tr>
          <td
            className="btn-content"
            style={{
              border: "none",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "middle",
              fontWeight: 600,
              borderRadius: 0,
              backgroundColor: "#47b19d",
              background: " #47b19d",
              padding: "8px 20px",
            }}
          >
            <a
              href={link}
              style={{
                textDecoration: "none",
                color: "#ffffff",
                fontSize: 14,
              }}
            >
              {title}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
