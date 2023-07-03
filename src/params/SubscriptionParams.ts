import { removeBlankAttributes } from '../utils';
import { Payhere } from '../Payhere';
import { SubscriptionParamsType } from '../interfaces/SubscriptionParamsType';

export class SubscriptionParams {
  private _subscriptionParams: SubscriptionParamsType;

  constructor(subscriptionParams: SubscriptionParamsType) {
    this._subscriptionParams = subscriptionParams;
  }

  public toJSON() {
    const formattedItems = this._subscriptionParams.items
      ? this._subscriptionParams.items.map((item, index) => ({
          [`item_name_${index}`]: item.name,
          [`item_number_${index}`]: item.modelNo,
          [`amount_${index}`]: item.amount,
          [`quantity_${index}`]: item.quantity,
        }))
      : [];

    const jsonObj = {
      merchant_id: Payhere.merchantId,
      return_url: this._subscriptionParams.returnUrl,
      cancel_url: this._subscriptionParams.cancelUrl,
      notify_url: this._subscriptionParams.notifyUrl,
      order_id: this._subscriptionParams.order_id,
      items: this._subscriptionParams.itemTitle,
      currency: this._subscriptionParams.currency,
      amount: this._subscriptionParams.amount,
      recurrence: this._subscriptionParams.recurrence.toString(),
      duration: this._subscriptionParams.duration.toString(),
      ...formattedItems,
      platform: this._subscriptionParams.platform,
      custom_1: this._subscriptionParams.custom1,
      custom_2: this._subscriptionParams.custom2,
      hash: this._subscriptionParams.hash,
    };
    return removeBlankAttributes(jsonObj);
  }
}
