import { Dispatch, SetStateAction } from 'react';

export interface IModalDisconnect {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  accountName: string;
  type: string;
  handleConfirm: () => void;
}
