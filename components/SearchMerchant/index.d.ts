import { DocumentNode } from 'graphql';
import type { IModalAddMerchant } from '../ModalAddMerchant/index.d';

export interface ISearchMerchant {
  token: string;
  firstMerchant: IMerchant;
  onSelectMerchant: (_selectedMerchant: IMerchant | null) => void;
  onAddMerchant: IModalAddMerchant['onAddMerchant'];
  merchantSubscription: DocumentNode;
  getAllMerchant: (_token: string) => Promise<IMerchant[]>;
}

export type IMerchant = {
  id: string;
  name: string;
};
