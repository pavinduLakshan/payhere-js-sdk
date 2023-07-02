import React from 'react';
import Routes from './Routes';
import { Payhere, AccountCategory } from 'payhere-js-sdk';

Payhere.init('1223417', AccountCategory.SANDBOX);

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
