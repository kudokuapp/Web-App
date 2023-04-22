import { Dispatch, SetStateAction } from 'react';

export interface IModalAddBudgeting {
  token: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
