import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { IWebsiteConfiguration } from '@strawberrylemonade/goodhub-lib';

export interface HeaderProps {
  config: IWebsiteConfiguration
}

const Header: FC<HeaderProps> = ({ config }) => {

  return <header className="bg-white shadow-sm w-screen z-20">
    <div className="max-w-6xl mx-auto px-1.5 sm:px-8 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex px-2 lg:px-0">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <p className="text-xl font-bold text-gray-900">{config.name}</p>
          </Link>
          <nav aria-label="Global" className="hidden lg:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              <p>About us</p>
            </Link>
            <Link to="/projects" className="flex items-center text-base font-medium text-gray-500 hover:text-gray-900">
              <p>Projects</p>
              <FiChevronDown className="ml-1 mt-0.5" />
            </Link>
            <Link to="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              <p>News</p>
            </Link>
            <Link to="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              <p>Get in touch</p>
            </Link>
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
      </div>
    </div>
  </header>;
}

export default Header;