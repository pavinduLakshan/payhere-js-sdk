import React from 'react';
import {PayhereSubscription,SubscriptionParams, Customer, Month,CurrencyType} from 'payhere-js-sdk'

const Subscription = () => {
    function initSubscription() {
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

        const subscriptionData = new SubscriptionParams({
            returnUrl: 'http://localhost:3000/return',
            cancelUrl: 'http://localhost:3000/cancel',
            notifyUrl: 'http://localhost:8080/notify',
            order_id: '112234',
            itemTitle: 'Demo Item',
            recurrence: new Month(1),
            duration: new Month(12),
            currency: CurrencyType.LKR,
            amount: 100
          }
        )
          
          const subscription = new PayhereSubscription(customer,subscriptionData,onPayhereSubscriptionError)
          subscription.start()
      }
      catch(err){
        console.log(err)
      }
      }

      function onPayhereSubscriptionError(errorMsg) {
        alert(errorMsg)
      }
    return (
        <div>
            <button onClick={initSubscription}>Initialize subscription</button>
        </div>
    );
};

export default Subscription;