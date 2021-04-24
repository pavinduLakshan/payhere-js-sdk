import {Customer} from './utils/Customer'

export enum AccountCategory {
  LIVE,
  SANDBOX,
}

export class Payhere {
  private static _merchantId: string;
  private static _baseUrl: string;
  private static _accessToken?: string;
  private static _customerInfo: Customer;

  static init(merchantId: string, accountType: AccountCategory, merchantSecret?: string, customerInfo?: Customer) {
    this._merchantId = merchantId;
    if (accountType === AccountCategory.LIVE) {
      this._baseUrl = 'https://www.payhere.lk';
    }
    else if (accountType === AccountCategory.SANDBOX) {
      this._baseUrl = 'https://sandbox.payhere.lk';
    }
    else throw new Error('Account type is reqquired, but has not been provided. Should be either LIVE or SANDBOX');
    if (merchantSecret) {
      const authCode = this.genAuthCode(merchantSecret);
      this._accessToken = this.genAccessToken(authCode)
    }
    if(customerInfo) {
      this._customerInfo = customerInfo
    }
  }

  static get merchantId(){
    return Payhere._merchantId;
  }

  static get baseUrl(){
    return Payhere._baseUrl;
  }

  static get accessToken(){
    return Payhere._accessToken;
  }

  static get customerInfo(){
    return Payhere._customerInfo;
  }

  private static genAuthCode(merchantSecret: string): string {
    return 'auth-code';
  }

  private static genAccessToken(authorizationCode: string): string {
    return 'access-token';
  }
}