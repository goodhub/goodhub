import { BrowserRouter as Router, Route as AnonymousRoute, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import Login from './components/authentication/Login';
import Logout from './components/authentication/Logout';
import Redirect from './components/authentication/Redirect';
import Header from './components/Header';
import Me from './components/Me';
import Onboarding from './components/onboarding/Onboarding';
import StandardRoute from './components/authentication/StandardRoute';

const App = () => {

  return <Router>
    <main className="min-h-screen w-screen flex flex-col bg-gray-50">
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
          <Switch>
            <AuthenticatedRoute path="/me">
              <Me></Me>
            </AuthenticatedRoute>
            <StandardRoute path="/">
              Hello?
            </StandardRoute>
          </Switch>
        </AnonymousRoute>
      </Switch>
    </main>
  </Router>
}

export default App;
