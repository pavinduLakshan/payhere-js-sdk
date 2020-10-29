import { AccountType } from './utils/AccountType';

export class Payhere {
  private static merchantId: string;
  private static accountType: AccountType;
  private static accessCode: string = '';
  private static authToken: string = '';

  static init(merchantId: string, accountType: string, authToken?: string) {
    Payhere.merchantId = merchantId;
    if (accountType === 'LIVE') Payhere.accountType = new AccountType('LIVE');
    else if (accountType === 'SANDBOX') Payhere.accountType = new AccountType('SANDBOX');
    else throw new Error('Account type is reqquired, but has not been provided. Should be either LIVE or SANDBOX');
    if (authToken) {
      Payhere.authToken = authToken;
      Payhere.accessCode = this.genAccessCode(authToken);
    }
  }

  static getMerchantId() {
    return Payhere.merchantId;
  }

  static getAccountType() {
    return Payhere.accountType;
  }

  static getAccessCode() {
    return Payhere.accessCode;
  }

  static getAuthToken() {
    return Payhere.authToken;
  }

  private static genAccessCode(authToken: string): string {
    return 'access-code';
  }
}
