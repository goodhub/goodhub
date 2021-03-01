import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import Authentication from './components/authentication/Authentication';
import Me from './components/Me';
import Onboarding from './components/onboarding/Onboarding';

const App = () => {

  return <Router>
    <main className="min-h-screen w-screen flex flex-col bg-gray-50">
      <Switch>

        <AuthenticatedRoute exact path='/'>
          <Me></Me>
        </AuthenticatedRoute>

        { /* Full page 'meta' routes */ }
        <Route exact path="/me/onboarding">
          <Onboarding></Onboarding>
        </Route>
        <Authentication></Authentication>
      </Switch>
    </main>
  </Router>
}

export default App;
