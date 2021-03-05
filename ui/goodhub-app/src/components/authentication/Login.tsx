import { FC, useEffect } from 'react';
import { getSetting } from '../../helpers/backstage';
import { NotAuthorisedError } from '../../helpers/errors';

import { useAuthenticationService } from '../../services/authentication-service';
import Loading from '../generic/Loading';

export interface LoginProps {}
 
const Login: FC<LoginProps> = () => {

  const { state, loginURL, setLoginURL } = useAuthenticationService((state) => ({ state: state.state, loginURL: state.loginURL, setLoginURL: state.setLoginURL }))
  console.log(`Authentication state is: ${state}. Forcing login regardless.`);

  useEffect(() => {
    (async () => {
      if (loginURL) window.location.href = loginURL;

      const configURL = await getSetting('auth:azure_b2c:login_page');
      if (!configURL) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

      const url = configURL.replace('{{redirect_url}}', encodeURIComponent(`${window.location.protocol}//${window.location.host}`));
      setLoginURL(url);
    })()
  }, [loginURL, setLoginURL])

  return <Loading></Loading>;
}

export default Login;