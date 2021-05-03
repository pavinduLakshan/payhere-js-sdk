import { removeBlankAttributes } from '.';

interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  delivery_address?: string;
  delivery_city?: string;
  delivery_country?: string;
}

export class Customer {
  private _customer: CustomerInfo;

  constructor(customer: CustomerInfo) {
    this._customer = customer;
  }

  public toJSON() {
    return removeBlankAttributes({
      first_name: this._customer.first_name,
      last_name: this._customer.last_name,
      email: this._customer.email,
      phone: this._customer.phone,
      address: this._customer.address,
      city: this._customer.city,
      country: this._customer.country,
      delivery_address: this._customer.delivery_address,
      delivery_city: this._customer.delivery_city,
      delivery_country: this._customer.delivery_country,
    });
  }
}
