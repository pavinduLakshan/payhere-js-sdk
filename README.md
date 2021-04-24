# payhere-js-sdk
Full Fledged JavaScript SDK for payhere.lk 

Payhere is one of the most popular payment gateways in Sri Lanka, yet there is still no comfortable way to integrate Payhere with modern front end JS frameworks such as 
React.js, Angular.js, and Vue.js. This NPM package can be used for a seamless Payhere integration with your single page web app.

## Features

- Works in front end JS frameworks
- Making one time payments with Checkout API
- Making Recurrent payments with Recurring API (monthly, daily. annually)
- Get payments data of your Payhere account using Retrieval API
- Linking customers payment info with your app for making future payments at any time without customer intervention
- subscriptions management (Find, retry and cancel subscriptions)

## Installation

With NPM
```
npm install payhere-js-sdk
```
With Yarn
```
yarn add payhere-js-sdk
```

## How to use

### Initialization

First initialize Payhere in the entry point of your Single Page App, by specifying the merchant ID and the account type as follows.

```
import {Payhere, AccountCategory} from "payhere-js-sdk"

// Sandbox 
Payhere.init("12xxxxx",AccountCategory.SANDBOX)

// Live
Payhere.init("12xxxxx",AccountCategory.LIVE)
```

If you plan to use the Retrieval API, Charging API or Subscription Manager API,remember to initialize the Payhere object with an authorization code as follows. 

```
// Replace this sample value with your authorization code
const authCode = "NE9WeDMzUlZPUGc0RHpkWlV6cTRBOTREMjo4bjRWQ2oyNU1YcDRKTERGeXZzRTloNGE4cWdiUGFaVUk0SkVXSzRGQ3ZvcA==" 
Payhere.init("12xxxxx",AccountCategory.SANDBOX,authCode)
```

To understand how to generate the authorization code, please refer to [the official docs](https://support.payhere.lk/api-&-mobile-sdk/payhere-subscription#2-generate-an-authorization-code).

### Checkout

``` 
import {Customer, CurrencyType, PayhereCheckout, CheckoutParams} from 'payhere-js-sdk'

function onPayhereCheckoutError(errorMsg) {
  alert(errorMsg)
}
  
function checkout() {
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
```

#### Subscription

```
import {PayhereSubscription,SubscriptionParams, Customer, Month,CurrencyType} from 'payhere-js-sdk'

function onPayhereSubscriptionError(errorMsg) {
  alert(errorMsg)
}

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
    })
          
    const subscription = new PayhereSubscription(customer,subscriptionData,onPayhereSubscriptionError)
    subscription.start()
  } catch(err){
    console.log(err)
  }
}
```

#### Preapproval

```
import {PayherePreapproval,PreapprovalParams, Customer, CurrencyType} from 'payhere-js-sdk'

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
    order_id: '112235',
    itemTitle: 'Demo Item',
    currency: CurrencyType.LKR
  })
  
  const preapp = new PayherePreapproval(customer,preappParams,(err) => alert(err))
  preapp.start()
}
```

#### Charge Pre approvals

Coming soon

### Payhere payment manager

Payhere payment manager contains functions to manage checkout operations and subscriptions associated with a Payhere account

#### Initialization

Coming soon

#### Retrieve access token

Coming soon

#### Get payment information of a checkout

Coming soon

#### Get all subscriptions

Coming soon

#### View payments of a subscription

Coming soon

#### Retry a subscription

Coming soon

#### Cancel a subscription

Coming soon