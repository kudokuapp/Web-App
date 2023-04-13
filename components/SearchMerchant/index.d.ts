import { DocumentNode } from 'graphql';
import type { IModalAddMerchant } from '../ModalAddMerchant';

export interface ISearchMerchant {
  token: string;
  firstMerchant: IMerchant;
  // eslint-disable-next-line no-unused-vars
  onSelectMerchant: (selectedMerchant: IMerchant | null) => void;
  onAddMerchant: IModalAddMerchant['onAddMerchant'];
  merchantSubscription: DocumentNode;
  // eslint-disable-next-line no-unused-vars
  getAllMerchant: (token: string) => Promise<IMerchant[]>;
}

export type IMerchant = {
  id: string;
  name: string;
};
