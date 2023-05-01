import { Dispatch, SetStateAction } from 'react';

export interface IModalEditAccount {
  token: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (
    _token: string,
    _accountId: string,
    _cashAccountName: string | null,
    _eMoneyCardNumber: string | null,
    _eMoneyInstitutionId: string | null
  ) => void | Promise<any>;
  type: 'cash' | 'emoney';
  accountId: string;
  cashOption: ICashOption | null;
  eMoneyOption: IEMoneyOption | null;
}

type ICashOption = {
  accountName: string;
};

type IEMoneyOption = {
  cardNumber: string;
  institutionId: string;
};
