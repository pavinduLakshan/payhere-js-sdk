import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Checkout from './views/Checkout';
import Home from './views/Home';
import PreApprove from './views/PreApprove';
import Subscription from './views/Subscription';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/preapprove" element={<PreApprove />}></Route>
        <Route path="/subscription" element={<Subscription />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
