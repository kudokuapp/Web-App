export interface IRenderMerchantImage {
  merchantId: string;
  direction?: 'IN' | 'OUT';
  merchantName: string;
  size?: 20 | 30 | 40;
}
