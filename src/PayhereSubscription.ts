import { Payhere } from './Payhere';
import { SubscriptionObjType } from './interfaces/subscriptionObj';

const requiredSubscriptionParams: { [key: string]: string } = {
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
  "recurrence": 'recurrence',
  "duration": 'duration',
  "amount": 'amount',
};
export class PayhereSubscription extends Payhere {
  private subscriptionObj: any = {};
  private onSubscriptionError: (errorMsg: string) => void;

  constructor(subscriptionObj: SubscriptionObjType, onError: (errorMsg: string) => void ) {
    super();
    try {
      const items = subscriptionObj.items
        ? subscriptionObj.items.map((item, index) => ({
            [`item_name_${index}`]: item.name,
            [`item_number_${index}`]: item.modelNo,
            [`amount_${index}`]: item.amount,
            [`quantity_${index}`]: item.quantity,
          }))
        : [];
console.log(subscriptionObj.recurrence.toString())
        this.subscriptionObj = {
        return_url: subscriptionObj.returnUrl,
        cancel_url: subscriptionObj.cancelUrl,
        notify_url: subscriptionObj.notifyUrl,
        first_name: subscriptionObj.firstName,
        last_name: subscriptionObj.lastName,
        email: subscriptionObj.email,
        phone: subscriptionObj.phone,
        address: subscriptionObj.address,
        city: subscriptionObj.city,
        country: subscriptionObj.country,
        order_id: subscriptionObj.order_id,
        items: subscriptionObj.itemTitle,
        currency: subscriptionObj.currency,
        recurrence: subscriptionObj.recurrence.toString(),
        duration: subscriptionObj.duration.toString(),
        amount: subscriptionObj.amount,

        delivery_address: subscriptionObj.deliveryAddress,
        delivery_city: subscriptionObj.deliveryCity,
        delivery_country: subscriptionObj.deliveryCountry,
        ...items,
        platform: subscriptionObj.platform,
        custom_1: subscriptionObj.custom1,
        custom_2: subscriptionObj.custom2,
        startup_fee: subscriptionObj.startupFee,
        hash: subscriptionObj.hash,
      };
      this.onSubscriptionError = onError;
    } catch (err) {
      throw new Error(err);
    }
  }

  async start() {
      if (!Payhere.getMerchantId()) {
        console.error('Payhere Error: Payhere is not initialized');
        this.onSubscriptionError("Payhere is not initialized")
        return;
      }

      try{
        const paymentReq = {
          merchant_id: Payhere.getMerchantId(),
          ...this.subscriptionObj,
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
            if (Object.keys(requiredSubscriptionParams).includes(name)) {
              console.error(`Payhere Error: ${requiredSubscriptionParams[name]} is a required parameter`)
              this.onSubscriptionError(`Payhere Error: ${requiredSubscriptionParams[name]} is a required parameter`);
              return;
            }
          }
        }
  
        window.document.body.appendChild(form);
        form.submit();
      }
      catch(err){
        console.error(err)
        this.onSubscriptionError('Unknown error: '+err)
      }
  }
}