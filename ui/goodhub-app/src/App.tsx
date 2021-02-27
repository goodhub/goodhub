import { BrowserRouter as Router, Switch } from "react-router-dom";
import Authentication from "./components/authentication/Authentication";
import Me from "./components/Me";

const App = () => {

  return <Router>
    <Me></Me>
    <Switch>
      <Authentication></Authentication>
    </Switch>
  </Router>
}

export default App;
