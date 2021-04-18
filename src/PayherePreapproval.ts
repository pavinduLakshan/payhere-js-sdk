import { Payhere } from './Payhere';
import {PreapprovalObjType} from './interfaces/preapprovalObj'

const requiredPreapprovalParams: { [key: string]: string } = {
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
  };

export class PayherePreapproval extends Payhere{
    private preappObj: any = {};
    private onApprovalError: (errorMsg: string) => void = (errorMsg) => console.log(errorMsg);

    constructor(preappObj: PreapprovalObjType, onApprovalError: (errorMsg: string) => void){
        super();
        this.onApprovalError = onApprovalError;
        this.preappObj = {
            return_url: preappObj.returnUrl,
            cancel_url: preappObj.cancelUrl,
            notify_url: preappObj.notifyUrl,
            first_name: preappObj.firstName,
            last_name: preappObj.lastName,
            email: preappObj.email,
            phone: preappObj.phone,
            address: preappObj.address,
            city: preappObj.city,
            country: preappObj.country,
            order_id: preappObj.order_id,
            items: preappObj.itemTitle,
            currency: preappObj.currency,

            platform: preappObj.platform,
            custom_1: preappObj.custom1,
            custom_2: preappObj.custom2,
            hash: preappObj.hash,
          };
    }

    async start() {
        if (!Payhere.getMerchantId()) {
          console.error('Payhere Error: Payhere is not initialized');
          this.onApprovalError('Payhere is not initialized');
          return;
        }
    
        try {
          const paymentReq = {
            merchant_id: Payhere.getMerchantId(),
            ...this.preappObj,
          };
    
          const form = window.document.createElement('form');
          form.setAttribute('action', Payhere.getBaseUrl() + '/pay/preapprove');
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
              if (Object.keys(requiredPreapprovalParams).includes(name)) {
                console.error(`Payhere Error: ${requiredPreapprovalParams[name]} is a required parameter`);
                this.onApprovalError(`Payhere Error: ${requiredPreapprovalParams[name]} is a required parameter`);
                return;
              }
            }
          }
    
          window.document.body.appendChild(form);
          form.submit();
        } catch (err) {
          console.error(err);
          this.onApprovalError('Unknown error: ' + err);
        }
      }
}