import { Dispatch, SetStateAction } from 'react';

export interface IAreYouSureModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirm: () => void;
}
