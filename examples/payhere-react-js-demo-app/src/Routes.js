import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Checkout from './views/Checkout';
import Home from './views/Home';
import PreApprove from './views/PreApprove';
import Subscription from './views/Subscription';

export default () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home}></Route>
      <Route path="/checkout" component={Checkout}></Route>
      <Route path="/preapprove" component={PreApprove}></Route>
      <Route path="/subscription" component={Subscription}></Route>
    </BrowserRouter>
  );
};
