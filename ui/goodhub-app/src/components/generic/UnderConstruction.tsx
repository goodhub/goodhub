import { FC } from 'react';

export interface UnderConstructionProps { }

const UnderConstruction: FC<UnderConstructionProps> = ({ children }) => {
  return <div className="flex flex-col flex-grow justify-center items-center p-4 bg-white shadow-sm rounded-lg border-t-8 border-primary-500">
    <div className="flex flex-col w-full items-center text-center max-w-2xl m-10">
      <svg className="mb-6" width="188" height="184" viewBox="0 0 188 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M85.4357 6.23993C117.576 2.95537 156.03 -8.796 177.069 15.7221C198.365 40.54 183.037 77.6141 173.531 108.904C165.164 136.447 154.034 164.902 128.01 177.205C102.164 189.423 71.844 182.777 46.9301 168.755C24.0369 155.87 10.0222 132.955 3.96827 107.392C-2.15935 81.5174 -2.05866 53.0323 14.62 32.3237C31.221 11.7115 59.1068 8.93063 85.4357 6.23993Z" fill="var(--color-primary-50)" />
        <rect x="136.209" y="165.645" width="134.77" height="18.2844" rx="9.1422" transform="rotate(-90 136.209 165.645)" fill="white" />
        <rect x="33.3467" y="165.645" width="134.77" height="18.2844" rx="9.1422" transform="rotate(-90 33.3467 165.645)" fill="white" />
        <rect x="21.9771" y="26.4958" width="143.373" height="37.935" rx="10" fill="var(--color-primary-50)" />
        <rect x="21.9771" y="84.9855" width="143.373" height="37.935" rx="10" fill="var(--color-primary-50)" />
        <path d="M68.4288 26.1796H34.3145L52.4054 64.4306H86.0043L68.4288 26.1796Z" fill="var(--color-primary-500)" />
        <path d="M68.4288 84.6695H34.3145L52.4054 122.921H86.0043L68.4288 84.6695Z" fill="var(--color-primary-500)" />
        <path d="M136.919 84.6695H102.805L120.896 122.921H154.495L136.919 84.6695Z" fill="var(--color-primary-500)" />
        <path d="M135.109 26.1796H100.995L119.086 64.4306H152.685L135.109 26.1796Z" fill="var(--color-primary-500)" />
        <path d="M168.388 54.0947V37.0802C168.388 33.6773 167.031 30.4246 164.618 28.0155C162.205 25.6134 158.931 24.2694 155.52 24.2694H32.3597C25.251 24.2694 19.4922 30.0028 19.4922 37.0802V54.1018V54.0947C19.485 60.9647 24.9206 66.6123 31.8068 66.9055V82.8332C24.9206 83.1263 19.485 88.774 19.4922 95.644V112.666V112.658C19.485 119.529 24.9206 125.176 31.8068 125.469V156.038C31.8068 161.95 36.6249 166.74 42.5633 166.74C48.5017 166.74 53.3126 161.95 53.3126 156.038V125.469H134.748V156.038C134.748 161.95 139.566 166.74 145.504 166.74C151.442 166.74 156.253 161.95 156.253 156.038V125.469C163.147 125.176 168.575 119.529 168.575 112.658V95.644C168.575 88.7739 163.147 83.1264 156.253 82.8332V66.9055C163.075 66.5194 168.403 60.8932 168.389 54.0946L168.388 54.0947ZM134.015 27.9294L151.291 63.2526L121.514 63.2454L104.238 27.9296L134.015 27.9294ZM152.397 66.9055V82.8261L138.424 82.8332V66.9055L152.397 66.9055ZM134.568 66.9055V82.8261L53.133 82.8332V66.9055L134.568 66.9055ZM100.188 27.9294L117.464 63.2526L87.8724 63.2454L70.5961 27.9296L100.188 27.9294ZM66.5465 27.9294L83.8228 63.2526L54.0529 63.2454L36.7694 27.9296L66.5465 27.9294ZM23.1683 54.0947V37.0802C23.1683 32.026 27.2827 27.9296 32.3594 27.9296H32.7256L50.0019 63.2528L32.3592 63.2456C29.925 63.2456 27.5841 62.2877 25.8607 60.5649C24.1374 58.8491 23.1681 56.5258 23.1681 54.095L23.1683 54.0947ZM49.6349 66.9055V82.8261L35.4821 82.8332V66.9055L49.6349 66.9055ZM49.6349 156.031V156.038C49.6349 159.927 46.4682 163.079 42.562 163.079C38.6486 163.079 35.4819 159.927 35.4819 156.038V125.469H49.6347L49.6349 156.031ZM32.3586 121.809C27.282 121.809 23.1675 117.713 23.1675 112.659V95.6441C23.1675 90.5898 27.282 86.4935 32.3586 86.4935H32.7248L50.0011 121.817L32.3586 121.809ZM54.0514 121.809L36.7679 86.4933H66.5526L83.8289 121.816L54.0514 121.809ZM87.8709 121.809L70.5946 86.4933H100.186L117.463 121.816L87.8709 121.809ZM121.512 121.809L104.236 86.4933H134.013L151.289 121.816L121.512 121.809ZM152.396 156.038C152.396 159.927 149.229 163.08 145.316 163.08C141.41 163.08 138.243 159.927 138.243 156.038V125.469H152.396L152.396 156.038ZM164.711 95.6439V112.665V112.658C164.711 115.089 163.741 117.412 162.018 119.128C160.295 120.851 157.954 121.809 155.52 121.809H155.153L138.056 86.4931H155.52C157.954 86.4931 160.295 87.451 162.018 89.1738C163.741 90.8896 164.711 93.2129 164.711 95.6437L164.711 95.6439ZM155.52 63.2526H155.153L138.056 27.9294H155.52C157.954 27.9294 160.295 28.8874 162.018 30.6102C163.741 32.3259 164.711 34.6493 164.711 37.08V54.1016V54.0945C164.711 59.1487 160.596 63.2451 155.52 63.2451L155.52 63.2526Z" fill="#404040" />
      </svg>
      <h1 className="text-4xl font-bold tracking-tight mb-6">Still working on it!</h1>
      <p>This section of GoodHub is still under construction but we are working on getting everything up and running and it will be available soon!</p>
    </div>
    <pre className="text-left max-w-4xl overflow-scroll text-xs whitespace-pre">{ children }</pre>
  </div>;
}

export default UnderConstruction;