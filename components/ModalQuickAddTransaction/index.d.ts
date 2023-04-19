import { Dispatch, SetStateAction } from 'react';

export interface IModalQuickAddTransaction {
  token: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (
    _token: string,
    _transactionName: string,
    _amount: string
  ) => void | Promise<any>;
  type: 'INCOME' | 'EXPENSE';
}
