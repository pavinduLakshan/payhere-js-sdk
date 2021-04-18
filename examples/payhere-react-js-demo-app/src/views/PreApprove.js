import React from 'react';
import {PayherePreapproval,CurrencyType} from 'payhere-js-sdk'

const PreApprove = () => {
    const preappObj = {
        returnUrl: 'http://localhost:3000/return',
        cancelUrl: 'http://localhost:3000/cancel',
        notifyUrl: 'https://dfc84fd10430.ngrok.io/preapprove-notify',
        firstName: 'Demo',
        lastName: 'Customer',
        email: 'plumberhl@gmail.com',
        phone: '+94771234567',
        address: 'No. 50, Highlevel Road',
        city: 'Panadura',
        country: 'Sri Lanka',
        order_id: '112233',
        itemTitle: 'Demo Item',
        currency: CurrencyType.LKR
      };

    function preApprove() {
        const preapp = new PayherePreapproval(preappObj,(err) => alert(err))
        preapp.start()
    }

    return (
        <div>
            <button onClick={preApprove}>Authorize Payhere</button>
        </div>
    );
};

export default PreApprove;