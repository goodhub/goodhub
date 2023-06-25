// Polyfills
import 'intersection-observer';

import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import { createBrowserHistory } from 'history';

import './index.css';

const history = createBrowserHistory();

const App = (() => {
  if (import.meta.env.VITE_BUILD_TARGET === 'main') {
    return loadable(() => import('./main/Main'));
  } else if (import.meta.env.VITE_BUILD_TARGET === 'external') {
    return loadable(() => import('./external/External'));
  } else {
    throw new Error('No such build target: ' + import.meta.env.VITE_BUILD_TARGET);
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <App history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);
