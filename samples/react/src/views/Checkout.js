import React from 'react';
import {Customer, CurrencyType,PayhereCheckout, CheckoutParams} from 'payhere-js-sdk'

const Checkout = () => {
    function onPayhereCheckoutError(errorMsg) {
        alert(errorMsg)
      }
  
      async function checkout(){          
            // using async await
            try {
              const customer = new Customer({
                first_name: "Pavindu",
                last_name: "Lakshan",
                phone: "+94771234567",
                email: "plumberhl@gmail.com",
                address: "No. 50, Highlevel Road",
                city: "Panadura",
                country: "Sri Lanka",
              })
              const checkoutData = new CheckoutParams({
                returnUrl: 'http://localhost:3000/return',
                cancelUrl: 'http://localhost:3000/cancel',
                notifyUrl: 'http://localhost:8080/notify',
                order_id: '112233',
                itemTitle: 'Demo Item',
                currency: CurrencyType.LKR,
                amount: 100
              })
            
              const checkout = new PayhereCheckout(customer,checkoutData,onPayhereCheckoutError)
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