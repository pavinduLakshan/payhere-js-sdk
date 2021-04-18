import React from 'react';
import {PayhereSubscription,Month,CurrencyType} from 'payhere-js-sdk'

const Subscription = () => {
    async function initSubscription() {
        // using async await
        try {
          const subscriptionObj = {
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
            recurrence: new Month(-1),
            duration: new Month(12),
            currency: CurrencyType.LKR,
            amount: 100
          }
          
          const subscription = new PayhereSubscription(subscriptionObj,onPayhereSubscriptionError)
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