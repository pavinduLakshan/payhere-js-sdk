import { removeBlankAttributes } from "../utils"
import { Payhere } from '../Payhere'
import { CheckoutParamsType } from '../interfaces/CheckoutParamsType'

export class CheckoutParams {
    private _checkoutParams: CheckoutParamsType

    constructor(checkoutParams: CheckoutParamsType){
        this._checkoutParams = checkoutParams
    }

    public toJSON(){
        const formattedItems = this._checkoutParams.items
        ? this._checkoutParams.items.map((item, index) => ({
            [`item_name_${index}`]: item.name,
            [`item_number_${index}`]: item.modelNo,
            [`amount_${index}`]: item.amount,
            [`quantity_${index}`]: item.quantity,
          }))
        : [];

        const jsonObj = {
            merchant_id: Payhere.merchantId,
            return_url: this._checkoutParams.returnUrl,
            cancel_url: this._checkoutParams.cancelUrl,
            notify_url: this._checkoutParams.notifyUrl,
            order_id: this._checkoutParams.order_id,
            items: this._checkoutParams.itemTitle,
            currency: this._checkoutParams.currency,
            amount: this._checkoutParams.amount,
            ...formattedItems,
            platform: this._checkoutParams.platform,
            custom_1: this._checkoutParams.custom1,
            custom_2: this._checkoutParams.custom2,
            hash: this._checkoutParams.hash
        }
        return removeBlankAttributes(jsonObj)
    }
}