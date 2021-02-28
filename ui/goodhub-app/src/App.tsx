import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/authentication/AuthenticatedRoute";
import Authentication from "./components/authentication/Authentication";
import Me from "./components/Me";

const App = () => {

  return <Router>
    <Switch>
      
      <AuthenticatedRoute exact path='/'>
        <Me></Me>
      </AuthenticatedRoute>
      
      { /* Full page "meta" routes */ }
      <Authentication></Authentication>
    </Switch>
  </Router>
}

export default App;
