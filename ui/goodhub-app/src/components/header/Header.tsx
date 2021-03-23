import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import AuthenticationHeaderItem from './AuthenticationHeaderItem';

export interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  return <header style={{ background: 'linear-gradient(90deg, #F0CA4D 0%, #F0C84D 83.45%, #E37A40 83.46%, #E37A40 87.06%, #DF4B4C 87.07%, #DF4B4C 90.19%, #47B19D 90.2%)' }} className="bg-mint-500 shadow-sm w-screen fixed top-0 left-0 z-20">
    <div className="max-w-6xl mx-auto px-1.5 sm:px-4 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex px-2 lg:px-0">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <svg className="h-10" viewBox="0 0 209 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d)">
                <rect x="17.1284" y="2.19824" width="2.21898" height="15.5329" rx="1.10949" fill="#394E53" />
                <rect x="23.7864" y="37.7017" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(-180 23.7864 37.7017)" fill="#394E53" />
                <rect x="2.80688" y="23.3794" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(-90 2.80688 23.3794)" fill="#394E53" />
                <rect x="38.3108" y="16.7222" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(90 38.3108 16.7222)" fill="#394E53" />
                <rect x="13.9016" y="3.20703" width="2.21898" height="11.0949" rx="1.10949" fill="#394E53" />
                <rect x="27.0139" y="36.6929" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(-180 27.0139 36.6929)" fill="#394E53" />
                <rect x="3.81543" y="26.6069" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(-90 3.81543 26.6069)" fill="#394E53" />
                <rect x="37.302" y="13.4946" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(90 37.302 13.4946)" fill="#394E53" />
                <rect x="10.4724" y="4.21533" width="2.21898" height="7.0604" rx="1.10949" fill="#394E53" />
                <rect x="30.4429" y="35.6846" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(-180 30.4429 35.6846)" fill="#394E53" />
                <rect x="4.82495" y="30.0361" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(-90 4.82495 30.0361)" fill="#394E53" />
                <rect x="36.2935" y="10.0649" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(90 36.2935 10.0649)" fill="#394E53" />
                <g opacity="0.5">
                  <rect x="30.8777" y="4.87402" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(45 30.8777 4.87402)" fill="#394E53" />
                  <rect x="5.28076" y="9.41602" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(-45 5.28076 9.41602)" fill="#394E53" />
                  <rect x="35.532" y="30.4712" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(135 35.532 30.4712)" fill="#394E53" />
                  <rect x="10.2256" y="35.125" width="2.21898" height="15.5329" rx="1.10949" transform="rotate(-135 10.2256 35.125)" fill="#394E53" />
                  <rect x="27.8821" y="3.30518" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(45 27.8821 3.30518)" fill="#394E53" />
                  <rect x="3.71191" y="12.4116" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(-45 3.71191 12.4116)" fill="#394E53" />
                  <rect x="37.1008" y="27.4756" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(135 37.1008 27.4756)" fill="#394E53" />
                  <rect x="13.2222" y="36.6943" width="2.21898" height="11.0949" rx="1.10949" transform="rotate(-135 13.2222 36.6943)" fill="#394E53" />
                  <rect x="24.7434" y="1.59326" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(45 24.7434 1.59326)" fill="#394E53" />
                  <rect x="2" y="15.5493" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(-45 2 15.5493)" fill="#394E53" />
                  <rect x="38.812" y="24.3374" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(135 38.812 24.3374)" fill="#394E53" />
                  <rect x="16.3596" y="38.4062" width="2.21898" height="7.0604" rx="1.10949" transform="rotate(-135 16.3596 38.4062)" fill="#394E53" />
                </g>
                <path d="M62.425 35.2997C70.7702 35.2997 77.8064 28.3454 77.8064 20.0002H62.425V24.2546H72.1611C70.6066 28.1817 66.9249 30.9635 62.425 30.9635C56.3707 30.9635 51.8708 26.0545 51.8708 20.0002C51.8708 13.9458 56.3707 9.0369 62.425 9.0369C65.534 9.0369 68.1521 10.2641 70.0339 12.3095L73.3065 9.0369C70.6066 6.41881 66.9249 4.70068 62.425 4.70068C53.998 4.70068 46.9619 11.5732 46.9619 20.0002C46.9619 29.0817 53.3435 35.2997 62.425 35.2997Z" fill="#394E53" />
                <path d="M88.0839 35.2997C92.9928 35.2997 97.2472 31.2907 97.2472 26.3818C97.2472 21.0638 93.4019 17.4639 88.0839 17.4639C83.1749 17.4639 78.9205 21.4729 78.9205 26.3818C78.9205 31.6998 82.7659 35.2997 88.0839 35.2997ZM88.0839 31.0453C85.4658 31.0453 83.5022 28.9999 83.5022 26.3818C83.5022 23.6819 85.4658 21.7183 88.0839 21.7183C90.7838 21.7183 92.6655 23.6819 92.6655 26.3818C92.6655 28.9999 90.7838 31.0453 88.0839 31.0453Z" fill="#394E53" />
                <path d="M107.626 35.2997C112.535 35.2997 116.789 31.2907 116.789 26.3818C116.789 21.0638 112.944 17.4639 107.626 17.4639C102.717 17.4639 98.4627 21.4729 98.4627 26.3818C98.4627 31.6998 102.308 35.2997 107.626 35.2997ZM107.626 31.0453C105.008 31.0453 103.044 28.9999 103.044 26.3818C103.044 23.6819 105.008 21.7183 107.626 21.7183C110.326 21.7183 112.208 23.6819 112.208 26.3818C112.208 28.9999 110.326 31.0453 107.626 31.0453Z" fill="#394E53" />
                <path d="M127.168 35.2997C132.077 35.2997 136.331 31.2907 136.331 26.3818V5.10976H131.75V18.9366C130.277 17.873 128.641 17.4639 126.923 17.4639C122.096 17.4639 118.005 21.4729 118.005 26.3818C118.005 31.6998 121.85 35.2997 127.168 35.2997ZM127.168 31.0453C124.55 31.0453 122.586 28.9999 122.586 26.3818C122.586 23.6819 124.55 21.7183 127.168 21.7183C129.868 21.7183 131.75 23.6819 131.75 26.3818C131.75 28.9999 129.868 31.0453 127.168 31.0453Z" fill="#394E53" />
                <path d="M139.807 34.8906H144.634V22.1274H161.079V34.8906H165.906V5.10976H161.079V17.873H144.634V5.10976H139.807V34.8906Z" fill="#394E53" />
                <path d="M176.814 35.2997C181.477 35.2997 186.059 31.6998 186.059 26.3818V17.873H181.477V26.3818C181.477 28.9999 179.595 31.0453 176.896 31.0453C174.277 31.0453 172.314 28.9999 172.314 26.3818V17.873H167.732V26.3818C167.732 31.6998 171.496 35.2997 176.814 35.2997Z" fill="#394E53" />
                <path d="M196.875 35.2997C201.783 35.2997 206.038 31.2907 206.038 26.3818C206.038 21.0638 202.438 17.4639 197.284 17.4639C195.156 17.4639 193.275 18.2002 192.293 19.3457V5.10976H187.711V26.3818C187.711 31.6998 191.557 35.2997 196.875 35.2997ZM196.875 31.0453C194.256 31.0453 192.293 28.9999 192.293 26.3818C192.293 23.6819 194.256 21.7183 196.875 21.7183C199.574 21.7183 201.456 23.6819 201.456 26.3818C201.456 28.9999 199.574 31.0453 196.875 31.0453Z" fill="#394E53" />
              </g>
              <defs>
                <filter id="filter0_d" x="0" y="0.593262" width="208.038" height="40.813" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
              </defs>
            </svg>

          </Link>
          <nav aria-label="Global" className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">

          </nav>
        </div>
        <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
        </div>
        <div className="flex items-center lg:hidden">
          <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <FiMenu className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="hidden lg:ml-4 lg:flex lg:items-center">
          <AuthenticationHeaderItem />
        </div>
      </div>
    </div>
  </header>;
}

export default Header;