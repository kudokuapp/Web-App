import type {
  IGetAllCashTransaction,
  IGetAllDebitTransaction,
  IGetAllEMoneyTransaction,
  IGetAllEWalletTransaction,
  IGetAllPayLaterTransaction,
} from '../../global';

export interface IOneTransaction {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;

  onClick: () => void;

  selectedTransaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction
    | null;
}
