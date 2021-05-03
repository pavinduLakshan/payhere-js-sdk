import { Payhere } from './Payhere';
import { submitPayhereClientRequest } from './utils';
import { CheckoutParams } from './params/CheckoutParams';
import { Customer } from './utils/Customer';

const requiredCheckoutParams: { [key: string]: string } = {
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
  amount: 'amount',
};
export class PayhereCheckout extends Payhere {
  private _checkoutParams: CheckoutParams;
  private _customerData: Customer;
  private onCheckoutError: (errorMsg: string) => void = (errorMsg: string) => console.error;

  constructor(customer: Customer, checkoutParams: CheckoutParams, onError?: (errorMsg: string) => void) {
    super();
    try {
      if (!customer) {
        throw new Error("Required parameter 'customer' is missing");
      }
      if (!checkoutParams) {
        throw new Error("Required parameter 'checkoutData' is missing");
      }
      this._customerData = customer;
      this._checkoutParams = checkoutParams;
      if (onError) {
        this.onCheckoutError = onError;
      }
    } catch (err) {
      this.onCheckoutError(err);
    }
  }

  start() {
    try {
      const checkoutReq: any = {
        ...this._checkoutParams.toJSON(),
        ...this._customerData.toJSON(),
      };
      submitPayhereClientRequest(checkoutReq, requiredCheckoutParams, '/pay/checkout', this.onCheckoutError);
    } catch (err) {
      this.onCheckoutError('Unknown error: ' + err);
    }
  }
}
