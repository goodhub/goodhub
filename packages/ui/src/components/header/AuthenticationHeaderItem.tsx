import { FC, useEffect } from 'react';
import { FiLogOut, FiUser, FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { IPersonState } from '../../../../shared';
import { NotAuthorisedError } from '../../helpers/errors';
import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import { usePersonService } from '../../services/person-service';
import { Action, Dropdown } from '../generic/Dropdown';
import Button from '../generic/Button';
import Spinner from '../generic/Spinner';
import Navigation from '../../translations/Navigation';
import { useVariable } from '@softwareimaging/backstage';
import { Variables } from '../../helpers/backstage-config';

const AuthenticationHeaderItem: FC = () => {
  const [userState, loginURL, setLoginURL] = useAuthenticationService(state => [
    state.state,
    state.loginURL,
    state.setLoginURL
  ]);
  const [personState, person] = usePersonService(state => [state.state, state.person]);

  const configURL = useVariable<Variables>('auth:azure_b2c:login_page');

  useEffect(() => {
    (async () => {
      if (loginURL) return;

      if (!configURL) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

      const url = configURL.replace(
        '{{redirect_url}}',
        encodeURIComponent(`${window.location.protocol}//${window.location.host}`)
      );
      setLoginURL(url);
    })();
  }, [loginURL, configURL, setLoginURL]);

  if (userState !== AuthenticationState.Authenticated) {
    return (
      <a href={loginURL}>
        <Button>{Navigation.auth.signIn}</Button>
      </a>
    );
  }

  if (personState === IPersonState.Identified) {
    return (
      <div className="relative flex-shrink-0">
        <Dropdown
          button={() => (
            <button
              type="button"
              className="bg-white overflow-hidden border-white border-2 rounded-full flex relative text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
              id="user-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-9 w-9 bg-black opacity-0 hover:opacity-25 top-0 left-0 absolute"></div>
              {person?.profilePicture ? (
                <img className="h-9 w-9" src={person.profilePicture.thumbnail} alt="Profile" />
              ) : (
                <div className="h-9 w-9 bg-green-200 flex justify-center items-center text-green-500 font-medium text-lg">
                  <span>{person?.firstName.substr(0, 1)}</span>
                </div>
              )}
            </button>
          )}
          actions={
            <>
              <Link to="/me" className="text-left flex items-center">
                <Action>
                  <FiImage className="mr-2 h-5 w-5" />
                  {person?.profilePicture ? Navigation.auth.changeProfilePicture : Navigation.auth.addAProfilePicture}
                </Action>
              </Link>
              <Link to="/me" className="flex items-center">
                <Action>
                  <FiUser className="mr-2 h-5 w-5" />
                  {Navigation.auth.myProfile}
                </Action>
              </Link>
              <Link to="/me/logout" className="flex items-center">
                <Action>
                  <FiLogOut className="ml-0.5 mr-2 h-4 w-4" />
                  {Navigation.auth.signOut}
                </Action>
              </Link>
            </>
          }
        >
          <div className="pt-1 p-3">
            <p>
              {person?.firstName} {person?.lastName}
            </p>
            <p className="text-gray-700 dark:text-white text-sm">{person?.email ?? person?.phoneNumber}</p>
          </div>
        </Dropdown>
      </div>
    );
  }

  if (personState === IPersonState.RequiresOnboarding) {
    return (
      <>
        <Link to="/me/onboarding" className="mr-2">
          <Button>{Navigation.auth.setUpYourAccount}</Button>
        </Link>
        <Link to="/me/logout" className="flex items-center">
          <Button>
            <FiLogOut className="ml-0.5 mr-2 h-4 w-4" />
            {Navigation.auth.signOut}
          </Button>
        </Link>
      </>
    );
  }

  return <Spinner size="10" className="mr-0.5"></Spinner>;
};

export default AuthenticationHeaderItem;
