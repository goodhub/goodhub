import { FC } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { History } from 'history';
import Site from './Site';

const App: FC<{ history: History }> = ({ history }) => {
  return (
    <Router history={history}>
      <main className="w-screen flex flex-col">
        <Switch>
          <Route path="/:organisationId?">
            <Site />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
