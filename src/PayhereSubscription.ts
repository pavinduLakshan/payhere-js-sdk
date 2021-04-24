import { Payhere } from './Payhere';
import { SubscriptionParams } from './params/SubscriptionParams'
import { submitPayhereClientRequest, Customer } from './utils'

const requiredSubscriptionParams: { [key: string]: string } = {
  return_url: 'returnUrl',
  cancel_url: 'cancelUrl',
  notify_url: 'notifyUrl',
  first_name: 'firstName',
  last_name: 'lastName',
  email: 'email',
  phone: 'phone',
  address: 'address',
  city: 'city',
  country: 'country',
  order_id: 'orderId',
  items: 'itemTitle',
  currency: 'currency',
  recurrence: 'recurrence',
  duration: 'duration',
  amount: 'amount',
};

export class PayhereSubscription extends Payhere {
  private _customerInfo: Customer;
  private _subscriptionParams: SubscriptionParams;
  private onSubscriptionError: (errorMsg: string) => void = (errorMsg) => console.log(errorMsg);

  constructor(customer: Customer, subscriptionParams: SubscriptionParams, onError: (errorMsg: string) => void) {
    super();
    try {
      this._customerInfo = customer
      this._subscriptionParams = subscriptionParams
      this.onSubscriptionError = onError;
    } catch (err) {
      throw new Error(err);
    }
  }

  async start() {



    try {
      const subscriptionReq = {
        ...this._customerInfo.toJSON(),
        ...this._subscriptionParams.toJSON()
      };
      submitPayhereClientRequest(subscriptionReq, requiredSubscriptionParams, '/pay/checkout', this.onSubscriptionError)
    } catch (err) {
      console.error(err);
      this.onSubscriptionError('Unknown error: ' + err);
    }
  }
}