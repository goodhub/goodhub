import { FC, useEffect } from 'react';
import { FiLogOut, FiUser, FiMenu, FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { AuthenticationState, useAuthenticationService } from '../services/authentication-service';
import { PersonState, usePersonService } from '../services/person-service';
import { NotAuthorisedError } from '../helpers/errors';
import { getSetting } from '../helpers/backstage';
import { Action, Dropdown } from './generic/Dropdown';
import Button from './generic/Button';
import Spinner from './generic/Spinner';


export interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  return <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
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
            <AuthHeaderItem></AuthHeaderItem>
          </div>
        </div>
      </div>
    </header>;
}

export default Header;

const AuthHeaderItem: FC = () => {
  
  const [userState, loginURL, setLoginURL] = useAuthenticationService(state => [state.state, state.loginURL, state.setLoginURL]);
  const [personState, person] = usePersonService(state => [state.state, state.person])

  useEffect(() => {
    (async () => {
      if (loginURL) return;

      const configURL = await getSetting('auth:azure_b2c:login_page');
      if (!configURL) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

      const url = configURL.replace('{{redirect_url}}', encodeURIComponent(`${window.location.protocol}//${window.location.host}`));
      setLoginURL(url);
    })()
  }, [loginURL, setLoginURL])

  if (userState !== AuthenticationState.Authenticated) {
    return <>
      <a href={loginURL} className="mr-2">
        <Button>Sign in</Button>
      </a>
      <a href={loginURL}>
        <Button>Sign up</Button>
      </a>
    </>;
  }

  if (personState === PersonState.Identified) {
    return <div className="ml-4 relative flex-shrink-0">
      <Dropdown 
        button={
          () => (
            <button type="button" className="bg-white overflow-hidden rounded-full flex relative text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" id="user-menu" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
              <div className="h-9 w-9 bg-black opacity-0 hover:opacity-25 top-0 left-0 absolute"></div>
              { person?.profilePicture
                ? <img className="h-9 w-9" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="Profile" />
                : <div className="h-9 w-9 bg-green-200 flex justify-center items-center text-green-500 font-medium text-lg"><span>{person?.firstName.substr(0, 1)}</span></div>
              }
            </button>
          )
        }
        actions={<>
          { !person?.profilePicture ? 
            <Link to="/me" className="flex items-center">
              <Action><FiImage className="mr-2 h-5 w-5" /> Add a profile picture</Action>
            </Link> : null }
          <Link to="/me" className="flex items-center">
            <Action><FiUser className="mr-2 h-5 w-5" /> My Profile</Action>
          </Link>
          <Link to="/me/logout" className="flex items-center">
            <Action><FiLogOut className="ml-0.5 mr-2 h-4 w-4" /> Sign out</Action>
          </Link>
        </>} 
      >
        <div className="pt-1 p-3">
          <p>{person?.firstName} {person?.lastName}</p>
          <p className="text-gray-700 dark:text-white text-sm">{person?.email ?? person?.phoneNumber}</p>
        </div>
      </Dropdown>
    </div>
  }

  if (personState === PersonState.RequiresOnboarding) {
    return <>
      <Link to="/me/onboarding" className="mr-2">
        <Button>Set up your account</Button>
      </Link>
      <Link to="/me/logout" className="flex items-center">
        <Button><FiLogOut className="ml-0.5 mr-2 h-4 w-4" /> Sign out</Button>
      </Link>
    </>
  }

  return <Spinner size="8" className="mr-0.5"></Spinner>
}