import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import Loading from '../generic/Loading';

export interface RedirectProps {}
 
const Redirect: FC<RedirectProps> = () => {

  const { 
    state, additionalMessage,
    onSuccessfulLogin,
    onFailedLogin
   } = useAuthenticationService((state) => ({ state: state.state, additionalMessage: state.additionalMessage, onSuccessfulLogin: state.onSuccessfulLogin, onFailedLogin: state.onFailedLogin }))
  console.log(`Authentication state is: ${state}. Saving new login regardless.`);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const hash = window.location.hash;
      if (!hash) return;

      const response = new URLSearchParams(hash.replace('#', '?'));
      const token = response.get('id_token');
      const accessToken = response.get('access_token');

      const error = response.get('error') as string | undefined;
      const errorDescription = response.get('error_description') as string | undefined;

      if ((!token || !accessToken) && error) {
        onFailedLogin(error, errorDescription);
        return;
      }

      onSuccessfulLogin(token!, accessToken!);
      const restore = window.localStorage.getItem('restore');
      window.localStorage.removeItem('restore');
      history.push(restore ? restore : '/');
    })()
  }, [onSuccessfulLogin, onFailedLogin, history])

  return state !== AuthenticationState.Failed ? <Loading></Loading> : <div>
    <p>{ additionalMessage }</p>
  </div>;
}

export default Redirect;