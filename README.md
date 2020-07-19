# payhere-js-sdk
Full Fledged JavaScript SDK for payhere.lk 

Payhere is one of the most popular payment gateways in Sri Lanka. Yet there is still no comfortable way to integrate Payhere with modern front end JS frameworks such as 
React.js, Angular.js and Vue.js. This NPM package can be used for a seamless Payhere integration with your single page web app.

## Features

- Making one time payments with Checkout API
- Making Recurrent payments with Recurring API (monthly, daily. annually)
- Get payments data of your Payhere account using Retrieval API
- Scheduling future payments at a predefined time using Preapproval API and Charging API

## Installation

With NPM
```
npm install payhere-js-sdk
```
With Yarn
```
yarn add payhere-js-sdk
```

##   How to use

This library has 2 main parts as Payhere and Payhere payment manager. The functions that each part contains are listed below.

### Payhere

#### Initialization

First create a Payhere object by specifying the merchant ID and the account type.
```
const merchantId = "12xxxxx"

// Sandbox 
const payhere = new Payhere(merchantId,'SANDBOX')

// Live
const payhere = new Payhere(merchantId,'LIVE')
```

#### Checkout

``` 
const checkoutObj = {}

// using promises
payhere.checkout(checkoutObj).then(res => {
  // successful checkout
  console.log(res)
}).catch(err => {
  // error occured
  console.log(err)
})

// using async await
try {
  const response = await payhere.checkout(checkOutObj)
  console.log(response)
}
catch(err){
  cosole.log(err)
}
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
