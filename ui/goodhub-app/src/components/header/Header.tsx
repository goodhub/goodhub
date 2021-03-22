import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import AuthenticationHeaderItem from './AuthenticationHeaderItem';

export interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  return <header className="bg-white shadow-sm w-screen fixed top-0 left-0 z-20">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8" src="/goodhub-green.svg" alt="GoodHub Logo"></img>
            </Link>
            <nav aria-label="Global" className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">

            </nav>
          </div>
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
          </div>
          <div className="flex items-center lg:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <FiMenu className="w-6 h-6" />
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