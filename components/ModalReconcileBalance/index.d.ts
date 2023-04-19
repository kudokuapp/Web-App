import { Dispatch, SetStateAction } from 'react';

export interface IModalReconcileBalance {
  token: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (_token: string, _amount: string) => void | Promise<any>;
}
