import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import Authentication from './components/authentication/Authentication';
import Header from './components/Header';
import Me from './components/Me';
import Onboarding from './components/onboarding/Onboarding';

const App = () => {

  return <Router>
    <main className="min-h-screen w-screen flex flex-col bg-gray-50">
      <Switch>
        { /* Full page 'meta' routes */ }
        <Route path="/me">
          <Route path="/me/onboarding">
            <Onboarding></Onboarding>
          </Route>
          <Authentication></Authentication>
        </Route>
        
        <AuthenticatedRoute path="/">
            <Header></Header>
            <Me></Me>
        </AuthenticatedRoute>
      </Switch>
    </main>
  </Router>
}

export default App;
