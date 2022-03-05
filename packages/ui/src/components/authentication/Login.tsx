import { FC, useEffect } from 'react';
import { useVariable } from '@softwareimaging/backstage'
import { useHistory } from 'react-router';
import { NotAuthorisedError } from '../../helpers/errors';

import { useAuthenticationService } from '../../services/authentication-service';
import Loading from '../generic/Loading';

export interface LoginProps {}
 
const Login: FC<LoginProps> = () => {

  const { state, loginURL, setLoginURL } = useAuthenticationService((state) => ({ state: state.state, loginURL: state.loginURL, setLoginURL: state.setLoginURL }))
  console.log(`Authentication state is: ${state}. Forcing login regardless.`);

  const history = useHistory<any>();
  const restore = history?.location?.state?.restore;

  const configURL = useVariable('auth:azure_b2c:login_page')

  useEffect(() => {
    (async () => {
      restore ? window.localStorage.setItem('restore', restore) : window.localStorage.removeItem('restore');
      if (loginURL) window.location.href = loginURL;

      if (!configURL) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

      const url = configURL.replace('{{redirect_url}}', encodeURIComponent(`${window.location.protocol}//${window.location.host}`));
      setLoginURL(url);
    })()
  }, [loginURL, configURL, setLoginURL, restore])

  return <Loading></Loading>;
}

export default Login;