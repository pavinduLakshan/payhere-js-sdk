import React from 'react';
import {CurrencyType,PayhereCheckout} from 'payhere-js-sdk'

const Checkout = () => {
    function onPayhereCheckoutError(errorMsg) {
        alert(errorMsg)
      }
  
      async function checkout(){          
            // using async await
            try {
                const checkoutObj = {
                  returnUrl: 'http://localhost:3000/return',
                  cancelUrl: 'http://localhost:3000/cancel',
                  notifyUrl: 'http://localhost:8080/notify',
                  firstName: 'Demo',
                  lastName: 'Customer',
                  email: 'plumberhl@gmail.com',
                  phone: '+94771234567',
                  address: 'No. 50, Highlevel Road',
                  city: 'Panadura',
                  country: 'Sri Lanka',
                  order_id: '112233',
                  itemTitle: 'Demo Item',
                  currency: CurrencyType.LKR,
                  amount: 100
                }
                
                const checkout = new PayhereCheckout(checkoutObj,onPayhereCheckoutError)
                checkout.start()
            }
            catch(err){
              console.log(err)
            }
      }

    return (
        <div>
            <button onClick={checkout}>Pay with Payhere</button>
        </div>
    );
};

export default Checkout;