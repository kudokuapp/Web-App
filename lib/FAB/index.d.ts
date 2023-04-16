export interface IFAB {
  token: string;
  accountType: 'cash' | 'debit' | 'ewallet' | 'emoney' | 'paylater';
  accountId: string;
  institutionId: string;
}
