import { Dispatch, SetStateAction } from 'react';

export interface IModalAddMerchant {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  urlMerchant: string;
  setUrlMerchant: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  onAddMerchant: (name: string, url: string) => void;
}
