import React from 'react';
import {PayherePreapproval,PreapprovalParams, Customer, CurrencyType} from '@payhere-js-sdk/client'

const PreApprove = () => {
    function preApprove() {
        const customer = new Customer({
            first_name: "Pavindu",
            last_name: "Lakshan",
            phone: "+94771234567",
            email: "plumberhl@gmail.com",
            address: "No. 50, Highlevel Road",
            city: "Panadura",
            country: "Sri Lanka",
        })

        const preappParams = new PreapprovalParams({
            returnUrl: 'http://localhost:3000/return',
            cancelUrl: 'http://localhost:3000/cancel',
            notifyUrl: 'https://dfc84fd10430.ngrok.io/preapprove-notify',
            order_id: '11223',
            itemTitle: 'Demo Item',
            currency: CurrencyType.LKR,
            amount: 10,
            hash: "45B44C29E9405BF9ADC3B8397EEAFCB8"
          })
        const preapp = new PayherePreapproval(customer,preappParams,(err) => alert(err))
        preapp.start()
    }

    return (
        <div>
            <button onClick={preApprove}>Authorize Payhere</button>
        </div>
    );
};

export default PreApprove;