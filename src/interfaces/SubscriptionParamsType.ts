import { Item } from './ItemType';
import { BaseParamsType } from './BaseParamsType'
import { RecurringTimeUnit } from '../utils/RecurringTimeUnit';

export interface SubscriptionParamsType extends BaseParamsType{
  // Recurring period
  recurrence: RecurringTimeUnit,
  // subscription duration
  duration: RecurringTimeUnit,
  // Total Payment Amount
  amount: number;

  /* Optional patameters*/

  // Delivery Address Line1 + Line2
  deliveryAddress?: string;
  // Delivery City
  deliveryCity?: string;
  // Delivery Country
  deliveryCountry?: string;
  items?: [Item];
  // Startup fee
  startupFee?: string;
}
