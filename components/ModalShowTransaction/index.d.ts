import { ISearchMerchant } from '$components/SearchMerchant';
import type {
  IGetAllCashTransaction,
  IGetAllDebitTransaction,
  IGetAllEMoneyTransaction,
  IGetAllEWalletTransaction,
  IGetAllPayLaterTransaction,
} from '../../global.d';
import { IRenderTitle } from './renderAtomicComponent';

export interface IModalShowTransaction {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;

  isOpen: boolean;
  onCloseModal: () => void;
  token: string;
  accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
  onSaveEditFunction: IRenderTitle['onSaveFunction'];
  onAddMerchant: ISearchMerchant['onAddMerchant'];
  merchantSubscription: ISearchMerchant['merchantSubscription'];
  getAllMerchant: ISearchMerchant['getAllMerchant'];
}

export type IEditableTransaction = {
  transactionName: string;
  amount: string;
  merchantId: string;
  merchantName: string;
  category: { name: string; amount: string; amountForDb?: string }[] | null;
  tags: { name: string; amount: string }[] | null;
  notes: string | null;
  isMerchantName?: boolean;
};
