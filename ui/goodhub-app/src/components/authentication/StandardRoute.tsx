import { FC, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
import { getPerson, PersonState, usePersonService } from '../../services/person-service';
 
const StandardRoute: FC<RouteProps> = ({ ...props }) => {
  const [authState, user] = useAuthenticationService(state => [state.state, state.user]);
  const [personState, setPerson, setRequiresOnboarding] = usePersonService(state => [state.state, state.setPerson, state.setRequiresOnboarding]);

  useEffect(() => {
    (async () => {
      // If the person isn't unknown, this has already happened or something has gone wrong
      if (personState !== PersonState.Unknown || authState === AuthenticationState.Unauthenticated) return;
      try {
        const response = await getPerson(user!.id);
        setPerson(response);
      } catch (e) {
        // If person doesn't exist but is successfully logged in, that indicates that they need to be onboarded
        if (e.code !== 404) { 
          throw e;
        }

        setRequiresOnboarding();
      }
    })()
  }, [authState, personState, user, setPerson, setRequiresOnboarding])

  // If they're a user & a person, go ahead and continue to what they wanted to see
  return <Route {...props}></Route> 
}

export default StandardRoute;