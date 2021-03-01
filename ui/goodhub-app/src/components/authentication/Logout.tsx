import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticationService } from '../../services/authentication-service';
import Loading from '../generic/Loading';

export interface LogoutProps {}
 
const Logout: FC<LogoutProps> = () => {

  const { state, onSuccessfulLogout } = useAuthenticationService((state) => ({ state: state.state, onSuccessfulLogout: state.onSuccessfulLogout }))
  console.log(`Authentication state is: ${state}. Logging out regardless.`);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      onSuccessfulLogout();
      history.push('/');
    })()
  }, [onSuccessfulLogout, history])

  return <Loading></Loading>;
}

export default Logout;