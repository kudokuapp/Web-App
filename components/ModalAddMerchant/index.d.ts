import { Dispatch, SetStateAction } from 'react';

export interface IModalAddMerchant {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setShowAddMerchant: Dispatch<SetStateAction<boolean>>;
  onSelectMerchant: (_selectedMerchant: IMerchant | null) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  urlMerchant: string;
  setUrlMerchant: Dispatch<SetStateAction<string>>;
  onAddMerchant: (_token: string, _name: string, _url: string) => Promise<void>;
  token: string;
}
