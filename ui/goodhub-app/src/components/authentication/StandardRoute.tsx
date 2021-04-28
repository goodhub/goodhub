import { FC, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { IPersonState } from '@strawberrylemonade/goodhub-lib';
import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import { getMe, usePersonService } from '../../services/person-service';
import { useErrorService } from '../../services/error-service';
 
const StandardRoute: FC<RouteProps> = ({ ...props }) => {
  const [authState, user] = useAuthenticationService(state => [state.state, state.user]);
  const [personState, setPerson] = usePersonService(state => [state.state, state.setPerson]);
  const setError = useErrorService(state => state.setError);

  useEffect(() => {
    (async () => {
      // If the person isn't unknown, this has already happened or something has gone wrong
      if (personState !== IPersonState.Unknown || authState === AuthenticationState.Unauthenticated) return;
      try {
        const response = await getMe();
        setPerson(response);
      } catch (e) {
        setError(e);
      }
    })()
  }, [authState, personState, user, setPerson, setError])

  // If they're a user & a person, go ahead and continue to what they wanted to see
  return <Route {...props}></Route> 
}

export default StandardRoute;