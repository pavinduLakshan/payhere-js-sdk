import React from 'react';
import { Customer, CurrencyType, PayhereCheckout, CheckoutParams } from 'payhere-js-sdk';

const Checkout = () => {
  function onPayhereCheckoutError(errorMsg) {
    alert(errorMsg);
  }

  async function checkout() {
    // using async await
    try {
      const customer = new Customer({
        first_name: 'Pavindu',
        last_name: 'Lakshan',
        phone: '+94771234567',
        email: 'plumberhl@gmail.com',
        address: 'No. 50, Highlevel Road',
        city: 'Panadura',
        country: 'Sri Lanka',
      });
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
      <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
        <input type="hidden" name="merchant_id" value="1223417" />
        <input type="hidden" name="return_url" value="http://localhost:3000/return" />
        <input type="hidden" name="cancel_url" value="http://localhost:3000/cancel" />
        <input type="hidden" name="notify_url" value="http://localhost:3000/cancel" />
        <input type="text" name="order_id" value="11223" />
        <input type="text" name="items" value="Door bell wireless" />
        <input type="text" name="currency" value="LKR" />
        <input type="text" name="amount" value="100" />
        <input type="text" name="first_name" value="Saman" />
        <input type="text" name="last_name" value="Perera" />
        <input type="text" name="email" value="samanp@gmail.com" />
        <input type="text" name="phone" value="0771234567" />
        <input type="text" name="address" value="No.1, Galle Road" />
        <input type="text" name="city" value="Colombo" />
        <input type="hidden" name="country" value="Sri Lanka" />
        <input type="hidden" name="hash" value="098F6BCD4621D373CADE4E832627B4F6" />

        <button onClick={checkout}>Pay with Payhere</button>
      </form>
    </div>
  );
};

export default Checkout;
