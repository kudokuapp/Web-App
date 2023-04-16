import { NameAmount } from 'global';
import { Dispatch, SetStateAction } from 'react';
import { IModalAddMerchant } from '../ModalAddMerchant/index.d';
import { IMerchant, ISearchMerchant } from '../SearchMerchant/index.d';

export interface IModalAddTransaction {
  token: string;
  accountId: string;
  institutionId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAddMerchant: ISearchMerchant['onAddMerchant'];
  merchantSubscription: ISearchMerchant['merchantSubscription'];
  getAllMerchant: ISearchMerchant['getAllMerchant'];
  onAddMerchant: IModalAddMerchant['onAddMerchant'];
  accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
  onSubmit: (
    _token: string,
    _accountId: string,
    _accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney',
    _transactionType: string,
    _transactionName: string,
    _transactionAmount: string,
    _category: NameAmount[],
    _merchant: IMerchant,
    _institutionId: string
  ) => Promise<any> | void;
}
