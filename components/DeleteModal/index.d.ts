import { Dispatch, SetStateAction } from 'react';

export interface IDeleteModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirm: () => void;
}
