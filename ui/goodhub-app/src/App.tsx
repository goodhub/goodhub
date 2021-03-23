import { FC } from 'react';
import { Router, Route as AnonymousRoute, Switch } from 'react-router-dom';

import { History } from 'history';

import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import Login from './components/authentication/Login';
import Logout from './components/authentication/Logout';
import Redirect from './components/authentication/Redirect';
import Header from './components/header/Header';
import Me from './components/Me';
import Onboarding from './components/onboarding/Onboarding';
import StandardRoute from './components/authentication/StandardRoute';
import Feed from './components/posts/Feed';

const App: FC<{ history: History }> = ({ history }) => {

  return <Router history={history}>
    <main className="min-h-screen w-screen flex flex-col">

      <Switch>
        <AnonymousRoute path="/me/onboarding">
          <Onboarding></Onboarding>
        </AnonymousRoute>
        <AnonymousRoute path='/me/login'>
          <Login></Login>
        </AnonymousRoute>
        <AnonymousRoute path='/me/logout'>
          <Logout></Logout>
        </AnonymousRoute>
        <AnonymousRoute path='/me/redirect'>
          <Redirect></Redirect>
        </AnonymousRoute>

        <AnonymousRoute>
          <Header></Header>
          <div className="max-w-6xl w-full mx-auto px-2 pt-20 sm:pt-24 sm:px-2 lg:px-8">
            <Switch>
              <AuthenticatedRoute path="/me">
                <Me></Me>
              </AuthenticatedRoute>
              <StandardRoute path="/">
                <Feed />
              </StandardRoute>
            </Switch>
          </div>
        </AnonymousRoute>
      </Switch>
    </main>
  </Router>
}

export default App;
