import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Skeleton } from '../../goodhub-app/src/shared/components/Skeleton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Skeleton width={90}></Skeleton>
        </a>
      </header>
    </div>
  );
}

export default App;
