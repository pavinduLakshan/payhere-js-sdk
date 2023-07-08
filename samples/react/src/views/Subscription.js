import React from 'react';
import {PayhereSubscription,SubscriptionParams, Customer, Month,CurrencyType} from '@payhere-js-sdk/client'

const Subscription = () => {
    function initSubscription() {
      try {
        const customer = new Customer({
          first_name: "John",
          last_name: "Doe",
          phone: "+94771234567",
          email: "johndoe@example.com",
          address: "No. 50, Highlevel Road",
          city: "Panadura",
          country: "Sri Lanka",
        })

        const subscriptionData = new SubscriptionParams({
            returnUrl: 'http://localhost:3000/return',
            cancelUrl: 'http://localhost:3000/cancel',
            notifyUrl: 'http://localhost:8080/notify',
            order_id: '11223',
            itemTitle: 'Demo Item',
            recurrence: new Month(1),
            duration: new Month(12),
            currency: CurrencyType.LKR,
            amount: 100,
            hash: 'CF596A3A5F0DB2A69E889A81BE04D7BB',
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
            <button onClick={initSubscription} style={{ cursor: "pointer" }}>Initialize subscription</button>
        </div>
    );
};

export default Subscription;