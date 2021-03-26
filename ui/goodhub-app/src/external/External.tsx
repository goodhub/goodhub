import { FC } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';

const App: FC<{ history: History }> = ({ history }) => {

  return <Router history={history}>
    <main className="min-h-screen w-screen flex flex-col">

    </main>
  </Router>
}

export default App;
