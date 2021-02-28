import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AuthenticationState, useAuthenticationService } from '../../services/authentication-service';
 
const AuthenticatedRoute: FC<RouteProps> = ({ ...props }) => {
  const state = useAuthenticationService(state => state.state);

  return state === AuthenticationState.Authenticated 
    ? <Route {...props}></Route> 
    : <Redirect to="/me/login"></Redirect>;
}

export default AuthenticatedRoute;