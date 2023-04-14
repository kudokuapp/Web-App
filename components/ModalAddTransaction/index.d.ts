import { Dispatch, SetStateAction } from 'react';
import { IModalAddMerchant } from '../ModalAddMerchant/index.d';
import { IMerchant, ISearchMerchant } from '../SearchMerchant/index.d';

export interface IModalAddTransaction {
  token: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  transactionName: string;
  setTransactionName: Dispatch<SetStateAction<string>>;
  onAddMerchant: ISearchMerchant['onAddMerchant'];
  merchantSubscription: ISearchMerchant['merchantSubscription'];
  getAllMerchant: ISearchMerchant['getAllMerchant'];
  onAddMerchant: IModalAddMerchant['onAddMerchant'];
  setMerchant: Dispatch<SetStateAction<IMerchant | null>>;
  setTransactionType: Dispatch<SetStateAction<string>>;
  accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney'
  ) => Promise<any>;
}
