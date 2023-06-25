import { FC } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Redirect from './Redirect';

export interface AuthenticationProps {}

const Authentication: FC<AuthenticationProps> = () => {
  return (
    <>
      <Route path="/me/login">
        <Login></Login>
      </Route>
      <Route path="/me/logout">
        <Logout></Logout>
      </Route>
      <Route path="/me/redirect">
        <Redirect></Redirect>
      </Route>
    </>
  );
};

export default Authentication;
