# payhere-js-sdk
Full Fledged JavaScript SDK for payhere.lk 

Payhere is one of the most popular payment gateways in Sri Lanka. Yet there is still no comfortable way to integrate Payhere with modern front end JS frameworks such as 
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
import {PayhereCheckout} from "payhere"

const checkoutObj = {
  returnUrl: 'http://localhost:3000/return',
  cancelUrl: 'http://localhost:3000/cancel',
  notifyUrl: 'http://localhost:8080/notify',
  firstName: 'Demo',
  lastName: 'Customer',
  email: 'customer@example.com',
  phone: '+94771234567',
  address: 'No. 50, Highlevel Road',
  city: 'Panadura',
  country: 'Sri Lanka',
  order_id: '112233',
  itemTitle: 'Demo Item',
  currency: 'LKR',
  amount: 100
}

function onPayhereCheckoutErr(errorMsg){
  alert(errorMsg)
}

const checkout = new PayhereCheckout(checkoutObj,onPayhereCheckoutErr)
checkout.start()
```

#### Subscription

``` 
const subscriptionObj = {}

// using promises
payhere.initSubscription(subscriptionObj).then(res => {
  // subscription started successfully
  console.log(res)
}).catch(err => {
  // error when initializing subscrption
  console.log(err)
})

// using async await
try {
  const response = await payhere.initSubscription(subscriptionObj)
  console.log(response)
}
catch(err){
  cosole.log(err)
}
```

#### Preapproval

```
const preApprovalObj = {}

// using promises
payhere.initPreApproval(preApprovalObj).then(res => {
  // subscription started successfully
  console.log(res)
}).catch(err => {
  // error when initializing subscrption
  console.log(err)
})

// using async await
try {
  const response = await payhere.initPreApproval(preApprovalObj)
  console.log(response)
}
catch(err){
  cosole.log(err)
}
```

#### Charge Pre approvals

```
const chargeObj = {}

// using promises
payhere.charge(chargeObj).then(res => {
  // charged successfully
  console.log(res)
}).catch(err => {
  // error when charging
  console.log(err)
})

// using async await
try {
  const response = await payhere.charge(chargeObj)
  console.log(response)
}
catch(err){
  cosole.log(err)
}
```

### Payhere payment manager

Payhere payment manager contains functions to manage checkout operations and subscriptions associated with a Payhere account

#### Initialization

```
import {PayhereManager} from 'payhere-js-sdk'
const merchantId = "12xxxx"

// Sandbox 
const payhereManager = new PayhereManager(merchantId,'SANDBOX')

// Live
const payhereManager = new PayhereManager(merchantId,'LIVE')
```

#### Retrieve access token

```
const accessToken = payhereManager.auth(appId, appSecret)
```

#### Get payment information of a checkout

```
payhereManager.findCheckoutById(subscriptionId).then(res => {
  // payment information
  console.log(res)
}).catch(err => {
  // error occured
  console.log(err)
})
```

#### Get all subscriptions

```
payhereManager.findAllSubscriptions().then(res => {
  // all subscriptions
  console.log(res)
}).catch(err => {
  // error occured
  console.log(err)
})
```

#### View payments of a subscription

```
payhereManager.findSubscriptionById(subscriptionId).then(res => {
  // payment information
  console.log(res)
}).catch(err => {
  // error occured
  console.log(err)
})
```

#### Retry a subscription

```
payhereManager.retrySubscription(subscriptionId).then(res => {
  // retry attempt successful
  console.log(res)
}).catch(err => {
  // error occured
  console.log(err)
})
```

#### Cancel a subscription

```
payhereManager.cancelSubscription(subscriptionId).then(res => {
  // subscription successful
  console.log(res)
}).catch(err => {
  // error occured
  console.log(err)
})
```
