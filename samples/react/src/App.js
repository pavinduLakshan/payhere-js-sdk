import React from 'react';
import Routes from './Routes';
import './App.css';
import { Payhere, AccountCategory } from 'payhere-js-sdk';

Payhere.init('1213750', AccountCategory.SANDBOX);

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
