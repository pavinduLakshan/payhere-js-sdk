import { Payhere } from './Payhere';
import { Customer } from './utils/Customer'
import { submitPayhereClientRequest } from './utils'
import { PreapprovalParams } from './params/PreapprovalParams'

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
    private _preappObj: PreapprovalParams;
    private _customerData: Customer;
    private onApprovalError: (errorMsg: string) => void = (errorMsg) => console.error(errorMsg);

    constructor(customer: Customer,preappObj: PreapprovalParams, onApprovalError: (errorMsg: string) => void){
        super();
        this._preappObj = preappObj
        this._customerData = customer
        this.onApprovalError = onApprovalError;
    }

    async start() {
        try {
          const preappReq = {
            ...this._preappObj.toJSON(),
            ...this._customerData.toJSON()
          }
          submitPayhereClientRequest(preappReq,requiredPreapprovalParams,'/pay/preapprove',this.onApprovalError)
        } catch (err) {
          this.onApprovalError('Unknown error: ' + err);
        }
    }
}