import { Payhere } from './Payhere';
import { CheckoutObjType } from './interfaces/checkoutObj';

export class PayhereCheckout extends Payhere {
  private checkoutObj: any = {};

  constructor(checkoutObj: CheckoutObjType) {
    super();
    try {
      const items = checkoutObj.items ? checkoutObj.items.map((item,index) => (
        {
          [`item_name_${index}`]: item.name,
          [`item_number_${index}`]: item.modelNo,
          [`amount_${index}`]: item.amount,
          [`quantity_${index}`]: item.quantity
        }
      )) : []
      
      const checkoutData = {
        "return_url": checkoutObj.returnUrl,
        "cancel_url": checkoutObj.cancelUrl,
        "notify_url": checkoutObj.notifyUrl,
        "first_name": checkoutObj.firstName,
        "last_name": checkoutObj.lastName,
        "email": checkoutObj.email,
        "phone": checkoutObj.phone,
        "address": checkoutObj.address,
        "city": checkoutObj.city,
        "country": checkoutObj.country,
        "order_id": checkoutObj.order_id,
        "items": checkoutObj.itemTitle,
        "currency": checkoutObj.currency,
        "amount": checkoutObj.amount,
        
        "delivery_address": checkoutObj.deliveryAddress,
        "delivery_city": checkoutObj.deliveryCity,
        "delivery_country": checkoutObj.deliveryCountry,
        ...items,
        "platform": checkoutObj.platform,
        "custom_1": checkoutObj.custom1,
        "custom_2": checkoutObj.custom2,
        "hash": checkoutObj.hash
      }
      
      this.checkoutObj = checkoutData;
    } catch (err) {
      throw new Error(err);
    }
  }

  async start() {
    if (!Payhere.getMerchantId()) throw new Error('Payhere is not initialized');
    const paymentReq = {
      "merchant_id": Payhere.getMerchantId(),
      ...this.checkoutObj,
    };

    const form = window.document.createElement("form")
    form.setAttribute('action',Payhere.getAccountType().baseUrl+"/pay/checkout")
    form.style.display = "none"
    form.setAttribute('method','post')
    for(const name of Object.keys(paymentReq)){
      if(paymentReq[name]){
        const inpt = window.document.createElement('input')
        inpt.setAttribute('name',name)
        inpt.setAttribute('type','hidden')
        inpt.setAttribute('value',paymentReq[name])
        form.appendChild(inpt)
      }
    }
    window.document.body.appendChild(form)
    form.submit()
  }
}