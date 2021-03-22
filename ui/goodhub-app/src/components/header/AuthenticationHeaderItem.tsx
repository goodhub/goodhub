import { FC, useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import { FiLogOut, FiUser, FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { IPersonState } from '@strawberrylemonade/goodhub-lib';
import { getSetting } from '../../helpers/backstage';
import { NotAuthorisedError } from '../../helpers/errors';
import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import { usePersonService } from '../../services/person-service';
import { Action, Dropdown } from '../generic/Dropdown';
import Button from '../generic/Button';
import Spinner from '../generic/Spinner';

const i18n = new LocalizedStrings({
  en: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    myProfile: 'My Profile',
    setUpYourAccount: 'Set up your account',
    addAProfilePicture: 'Add a profile picture',
    changeProfilePicture: 'Change profile picture'
  }
})

const AuthenticationHeaderItem: FC = () => {
  
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
        <Button>{i18n.signIn}</Button>
      </a>
      <a href={loginURL}>
        <Button>{i18n.signUp}</Button>
      </a>
    </>;
  }

  if (personState === IPersonState.Identified) {
    return <div className="ml-4 relative flex-shrink-0">
      <Dropdown 
        button={
          () => (
            <button type="button" className="bg-white overflow-hidden rounded-full flex relative text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" id="user-menu" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
              <div className="h-9 w-9 bg-black opacity-0 hover:opacity-25 top-0 left-0 absolute"></div>
              { person?.profilePicture
                ? <img className="h-9 w-9" src={person.profilePicture.thumbnail} alt="Profile" />
                : <div className="h-9 w-9 bg-green-200 flex justify-center items-center text-green-500 font-medium text-lg"><span>{person?.firstName.substr(0, 1)}</span></div>
              }
            </button>
          )
        }
        actions={<>
          <Link to="/me" className="flex items-center">
            <Action><FiImage className="mr-2 h-5 w-5" />{person?.profilePicture ? i18n.changeProfilePicture : i18n.addAProfilePicture}</Action>
          </Link>
          <Link to="/me" className="flex items-center">
            <Action><FiUser className="mr-2 h-5 w-5" />{i18n.myProfile}</Action>
          </Link>
          <Link to="/me/logout" className="flex items-center">
            <Action><FiLogOut className="ml-0.5 mr-2 h-4 w-4" />{i18n.signOut}</Action>
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

  if (personState === IPersonState.RequiresOnboarding) {
    return <>
      <Link to="/me/onboarding" className="mr-2">
        <Button>{i18n.setUpYourAccount}</Button>
      </Link>
      <Link to="/me/logout" className="flex items-center">
        <Button><FiLogOut className="ml-0.5 mr-2 h-4 w-4" />{i18n.signOut}</Button>
      </Link>
    </>
  }

  return <Spinner size="8" className="mr-0.5"></Spinner>
}

export default AuthenticationHeaderItem;