import React from 'react';
import Routes from './Routes';
import { Payhere, AccountCategory } from 'payhere-js-sdk';

Payhere.init(process.env.REACT_APP_PAYHERE_MERCHANT_ID, AccountCategory.SANDBOX);

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
