import { FC, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import { getPerson, PersonState, usePersonService } from '../../services/person-service';
 
const StandardRoute: FC<RouteProps> = ({ ...props }) => {
  const [authState, user] = useAuthenticationService(state => [state.state, state.user]);
  const [personState, setPerson] = usePersonService(state => [state.state, state.setPerson]);

  useEffect(() => {
    (async () => {
      // If the person isn't unknown, this has already happened or something has gone wrong
      if (personState !== PersonState.Unknown || authState === AuthenticationState.Unauthenticated) return;
      try {
        const response = await getPerson(user!.id);
        setPerson(response);
      } catch (e) {
        console.error(e);
      }
    })()
  }, [authState, personState, user, setPerson])

  // If they're a user & a person, go ahead and continue to what they wanted to see
  return <Route {...props}></Route> 
}

export default StandardRoute;