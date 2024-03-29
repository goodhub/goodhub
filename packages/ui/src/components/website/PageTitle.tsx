import { FC } from 'react';

export interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-col bg-primary justify-center items-center relative overflow-hidden p-4 shadow">
      <h1 className="sm:text-4xl text-3xl font-bold text-primary-appropriate z-10">{title}</h1>
      <svg
        className="w-full h-5/6 absolute bottom-0 "
        preserveAspectRatio="none"
        viewBox="0 0 613 248"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.288086 30.3717L25.8166 20.0242C51.3451 9.67672 102.402 -11.0183 153.459 9.67672C204.516 30.3717 255.573 92.4568 306.63 102.804C357.687 113.152 408.744 71.7618 459.801 66.588C510.858 61.4143 561.915 92.4568 587.444 107.978L612.972 123.499V247.67H587.444C561.915 247.67 510.858 247.67 459.801 247.67C408.744 247.67 357.687 247.67 306.63 247.67C255.573 247.67 204.516 247.67 153.459 247.67C102.402 247.67 51.3451 247.67 25.8166 247.67H0.288086V30.3717Z"
          fill="white"
          fill-opacity="0.15"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.288086 150.669H17.5655C34.8429 150.669 68.0687 150.669 102.624 160.669C135.849 169.669 170.404 187.669 204.959 189.669C238.185 192.669 272.74 178.669 307.295 162.669C340.52 146.669 375.075 127.669 408.301 121.669C442.856 114.669 477.411 118.669 510.637 125.669C545.191 132.669 578.417 141.669 595.695 146.669L612.972 150.669V247.669H595.695C578.417 247.669 545.191 247.669 510.637 247.669C477.411 247.669 442.856 247.669 408.301 247.669C375.075 247.669 340.52 247.669 307.295 247.669C272.74 247.669 238.185 247.669 204.959 247.669C170.404 247.669 135.849 247.669 102.624 247.669C68.0687 247.669 34.8429 247.669 17.5655 247.669H0.288086V150.669Z"
          fill="white"
          fill-opacity="0.15"
        />
      </svg>
    </div>
  );
};

export default PageTitle;
