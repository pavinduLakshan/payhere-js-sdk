export class AccountType {
  baseUrl: string = '';
  accountType: string = '';

  constructor(accountType: string) {
    if (accountType === 'LIVE') {
      this.baseUrl = 'https://www.payhere.lk';
      this.accountType = accountType;
    } else if (accountType === 'SANDBOX') {
      this.baseUrl = 'https://sandbox.payhere.lk';
      this.accountType = accountType;
    }
  }
}
