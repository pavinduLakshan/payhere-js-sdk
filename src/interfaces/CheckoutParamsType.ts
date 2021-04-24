import { Item } from './ItemType';
import { BaseParamsType } from './BaseParamsType'

export interface CheckoutParamsType extends BaseParamsType{
    // Total Payment Amount
    amount: number;
    /* Optional patameters*/
    // Delivery Address Line1 + Line2
    deliveryAddress?: string;
    // Delivery City
    deliveryCity?: string;
    // Delivery Country
    deliveryCountry?: string;
    // Array of Items purchased
    items?: [Item];
}

