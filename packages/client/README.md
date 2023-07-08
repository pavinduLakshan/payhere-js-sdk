<p align="center">
  <img width="600" height="200" width="400" src="https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png">
</p>

# @payhere-js-sdk/client
JavaScript SDK for integrating payhere.lk with single page apps.

Payhere, one of the most popular payment gateways in Sri Lanka, lacks a developer-friendly integration with modern front-end JS frameworks like React.js, Angular.js, and Vue.js etc. But worry not! We have developed an NPM package specifically designed to effortlessly integrate Payhere into your single-page web app, ensuring a seamless user experience.

Have a look at the [demo React.js app](https://github.com/pavinduLakshan/payhere-js-sdk/samples/react) to get an idea of how to use this package.

## Features

- Works in front end JS frameworks
- Making one time payments with Checkout API
- Making Recurrent payments with Recurring API (monthly, daily. annually)
- Get payments data of your Payhere account using Retrieval API
- Linking customers payment info with your app for making future payments at any time without customer intervention

## Installation

With NPM

```shell
npm install @payhere-js-sdk/client
```

With Yarn

```shell
yarn add @payhere-js-sdk/client
```

With pnpm

```shell
pnpm i @payhere-js-sdk/client
```

## How to use

### Initialization

First initialize Payhere in the entry point of your Single Page App, by specifying the merchant ID and the account type as follows.

```js
import {Payhere, AccountCategory} from "@payhere-js-sdk/client"

// Sandbox 
Payhere.init("12xxxxx",AccountCategory.SANDBOX)

// Live
Payhere.init("12xxxxx",AccountCategory.LIVE)
```

### Checkout

```js
import {Customer, CurrencyType, PayhereCheckout, CheckoutParams} from '@payhere-js-sdk/client'

function onPayhereCheckoutError(errorMsg) {
  alert(errorMsg)
}
  
function checkout() {
  const customer = new Customer({
    first_name: "Demo",
    last_name: "User",
    phone: "+94771234567",
    email: "user@example.com",
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
```

### Subscription

```js
import {PayhereSubscription,SubscriptionParams, Customer, Month,CurrencyType} from '@payhere-js-sdk/client'

function onPayhereSubscriptionError(errorMsg) {
  alert(errorMsg)
}

function initSubscription() {
  try {
    const customer = new Customer({
      first_name: "Demo",
      last_name: "User",
      phone: "+94771234567",
      email: "user@example.com",
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
    })
          
    const subscription = new PayhereSubscription(customer,subscriptionData,onPayhereSubscriptionError)
    subscription.start()
  } catch(err){
    console.log(err)
  }
}
```

### Preapproval

```js
import {PayherePreapproval,PreapprovalParams, Customer, CurrencyType} from '@payhere-js-sdk/client'

function preApprove() {
  const customer = new Customer({
    first_name: "Demo",
    last_name: "User",
    phone: "+94771234567",
    email: "user@example.com",
    address: "No. 50, Highlevel Road",
    city: "Panadura",
    country: "Sri Lanka",
  })

  const preappParams = new PreapprovalParams({
    returnUrl: 'http://localhost:3000/return',
    cancelUrl: 'http://localhost:3000/cancel',
    notifyUrl: 'https://dfc84fd10430.ngrok.io/preapprove-notify',
    order_id: '112235',
    itemTitle: 'Demo Item',
    currency: CurrencyType.LKR
  })
  
  const preapp = new PayherePreapproval(customer,preappParams,(err) => alert(err))
  preapp.start()
}
```

## Contributing

This package is still in its early stages. All conributions are highly welcome.  
Please read the [contributing guide](../../CONTRIBUTING.md) to get started.
