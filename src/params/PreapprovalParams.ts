import { removeBlankAttributes } from "../utils"
import { Payhere } from '../Payhere'
import {BaseParamsType as PreapprovalParamsType} from '../interfaces/BaseParamsType'

export class PreapprovalParams {
    private _preapprovalParams: PreapprovalParamsType

    constructor(preapprovalParams: PreapprovalParamsType){
        this._preapprovalParams = preapprovalParams
    }

    public toJSON(){
        const jsonObj = {
            "merchant_id": Payhere.merchantId,
            "return_url": this._preapprovalParams.returnUrl,
            "cancel_url": this._preapprovalParams.cancelUrl,
            "notify_url": this._preapprovalParams.notifyUrl,
            "order_id": this._preapprovalParams,
            "items": this._preapprovalParams.itemTitle,
            "currency": this._preapprovalParams.currency,
            "platform": this._preapprovalParams.platform,
            "custom_1": this._preapprovalParams.custom1,
            "custom_2": this._preapprovalParams.custom2,
            "hash": this._preapprovalParams.hash
        }
        return removeBlankAttributes(jsonObj)
    }
}