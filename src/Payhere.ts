export enum AccountCategory {
  LIVE,
  SANDBOX,
}
export class Payhere {
  private static merchantId: string;
  private static baseUrl: string;
  private static accessCode: string = '';
  private static authToken: string = '';

  static init(merchantId: string, accountType: AccountCategory, authToken?: string) {
    this.merchantId = merchantId;
    if (accountType === AccountCategory.LIVE) {
      this.baseUrl = 'https://www.payhere.lk';
    }
    else if (accountType === AccountCategory.SANDBOX) {
      this.baseUrl = 'https://sandbox.payhere.lk';
    }
    else throw new Error('Account type is reqquired, but has not been provided. Should be either LIVE or SANDBOX');
    if (authToken) {
      Payhere.authToken = authToken;
      Payhere.accessCode = this.genAccessCode(authToken);
    }
  }

  static getMerchantId() {
    return this.merchantId;
  }

  static getAccessCode() {
    return this.accessCode;
  }

  static getAuthToken() {
    return this.authToken;
  }

  static getBaseUrl() {
    return this.baseUrl
  }

  private static genAccessCode(authToken: string): string {
    return 'access-code';
  }
}
