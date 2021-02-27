import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticationService } from '../../services/authentication-service';
import Loading from '../Loading';

export interface RedirectProps {}
 
const Redirect: FC<RedirectProps> = () => {

  const { state, onSuccessfulLogin } = useAuthenticationService((state) => ({ state: state.state, onSuccessfulLogin: state.onSuccessfulLogin }))
  console.log(`Authentication state is: ${state}. Saving new login regardless.`);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const hash = window.location.hash;
      if (!hash) return;

      const response = new URLSearchParams(hash.replace('#', '?'));
      const token = response.get('id_token');
      const accessToken = response.get('access_token');

      if (!token || !accessToken) {
        console.log('Login failed.');
        return;
      }

      onSuccessfulLogin(token, accessToken);
      history.push('/');
    })()
  }, [onSuccessfulLogin, history])

  return <Loading></Loading>;
}

export default Redirect;