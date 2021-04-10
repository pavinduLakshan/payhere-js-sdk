import { Payhere } from './Payhere';
import { CheckoutObjType } from './interfaces/checkoutObj';

const requiredCheckoutParams: { [key: string]: string } = {
  "return_url" : 'returnUrl',
  "cancel_url": 'cancelUrl',
  "notify_url": 'notifyUrl',
  "first_name": 'firstName',
  "last_name": 'lastName',
  "email": 'email',
  "phone": 'phone',
  "address": 'address',
  "city": 'city',
  "country": 'country',
  "order_id": 'orderId',
  "items": 'itemTitle',
  "currency": 'currency',
  "amount": 'amount',
};
export class PayhereCheckout extends Payhere {
  private checkoutObj: any = {};
  private onCheckoutError: (errorMsg: string) => void;

  constructor(checkoutObj: CheckoutObjType, onError: (errorMsg: string) => void ) {
    super();
    try {
      const items = checkoutObj.items
        ? checkoutObj.items.map((item, index) => ({
            [`item_name_${index}`]: item.name,
            [`item_number_${index}`]: item.modelNo,
            [`amount_${index}`]: item.amount,
            [`quantity_${index}`]: item.quantity,
          }))
        : [];

        this.checkoutObj = {
        return_url: checkoutObj.returnUrl,
        cancel_url: checkoutObj.cancelUrl,
        notify_url: checkoutObj.notifyUrl,
        first_name: checkoutObj.firstName,
        last_name: checkoutObj.lastName,
        email: checkoutObj.email,
        phone: checkoutObj.phone,
        address: checkoutObj.address,
        city: checkoutObj.city,
        country: checkoutObj.country,
        order_id: checkoutObj.order_id,
        items: checkoutObj.itemTitle,
        currency: checkoutObj.currency,
        amount: checkoutObj.amount,

        delivery_address: checkoutObj.deliveryAddress,
        delivery_city: checkoutObj.deliveryCity,
        delivery_country: checkoutObj.deliveryCountry,
        ...items,
        platform: checkoutObj.platform,
        custom_1: checkoutObj.custom1,
        custom_2: checkoutObj.custom2,
        hash: checkoutObj.hash,
      };
      this.onCheckoutError = onError;
    } catch (err) {
      throw new Error(err);
    }
  }

  async start() {
      if (!Payhere.getMerchantId()) {
        console.error('Payhere Error: Payhere is not initialized');
        this.onCheckoutError("Payhere is not initialized")
        return;
      }

      try{
        const paymentReq = {
          merchant_id: Payhere.getMerchantId(),
          ...this.checkoutObj,
        };
  
        const form = window.document.createElement('form');
        form.setAttribute('action', Payhere.getBaseUrl() + '/pay/checkout');
        form.style.display = 'none';
        form.setAttribute('method', 'post');
  
        for (const name of Object.keys(paymentReq)) {
          if (paymentReq[name]) {
            const inpt = window.document.createElement('input');
            inpt.setAttribute('name', name);
            inpt.setAttribute('type', 'hidden');
            inpt.setAttribute('value', paymentReq[name]);
            form.appendChild(inpt);
          } else {
            if (Object.keys(requiredCheckoutParams).includes(name)) {
              console.error(`Payhere Error: ${requiredCheckoutParams[name]} is a required parameter`)
              this.onCheckoutError(`Payhere Error: ${requiredCheckoutParams[name]} is a required parameter`);
              return;
            }
          }
        }
  
        window.document.body.appendChild(form);
        form.submit();
      }
      catch(err){
        console.error(err)
        this.onCheckoutError('Unknown error: '+err)
      }
  }
}