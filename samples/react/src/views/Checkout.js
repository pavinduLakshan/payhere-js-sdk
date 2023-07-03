import React from 'react';
import { Customer, CurrencyType, PayhereCheckout, CheckoutParams } from 'payhere-js-sdk';

const customerAttributes = {
  first_name: 'John',
  last_name: 'Doe',
  phone: '+94771234567',
  email: 'john@johndoe.com',
  address: 'No. 50, Highlevel Road',
  city: 'Panadura',
  country: 'Sri Lanka',
};

const checkoutAttributes = {
  returnUrl: 'http://localhost:3000/return',
  cancelUrl: 'http://localhost:3000/cancel',
  notifyUrl: 'http://localhost:8080/notify',
  order_id: '11223',
  itemTitle: 'Demo Item',
  currency: CurrencyType.LKR,
  amount: 100,
  hash: 'CF596A3A5F0DB2A69E889A81BE04D7BB',
};

const Checkout = () => {
  function onPayhereCheckoutError(errorMsg) {
    alert(errorMsg);
  }

  async function checkout() {
    // using async await
    try {
      const customer = new Customer(customerAttributes);

      const checkoutData = new CheckoutParams({
        returnUrl: 'http://localhost:3000/return',
        cancelUrl: 'http://localhost:3000/cancel',
        notifyUrl: 'http://localhost:8080/notify',
        order_id: '11223',
        itemTitle: 'Demo Item',
        currency: CurrencyType.LKR,
        amount: 100,
        hash: 'CF596A3A5F0DB2A69E889A81BE04D7BB',
      });

      const checkout = new PayhereCheckout(customer, checkoutData, onPayhereCheckoutError);
      checkout.start();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First name</td>
            <td>{ customerAttributes.first_name }</td>
          </tr>
          <tr>
            <td>Last name</td>
            <td>{ customerAttributes.last_name }</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{ customerAttributes.phone }</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{ customerAttributes.email }</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{ customerAttributes.address }</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{ customerAttributes.city }</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{ customerAttributes.country }</td>
          </tr>
          <tr>
            <td>Product name</td>
            <td>{ checkoutAttributes.itemTitle }</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{ checkoutAttributes.amount }</td>
          </tr>
        </tbody>
      </table>
        <button onClick={checkout} style={{ cursor: "pointer" }}>Pay with Payhere</button>
    </div>
  );
};

export default Checkout;
