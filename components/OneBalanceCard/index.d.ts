import { HTMLProps, MouseEventHandler, RefObject } from 'react';
import type { IOptionsButton } from './atomic/OptionsButton/index.d';

export interface IOneBalanceCard extends HTMLProps<HTMLDivElement> {
  isSelected: boolean;
  selectedAccountRef?: RefObject<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLDivElement>;
  account: {
    institutionId: string;
    accountNumber: string;
    balance: string;
    latestTransaction: string | null;
    createdAt: string;
    type: 'Cash' | 'Debit' | 'EWallet' | 'EMoney' | 'PayLater';
    expired: boolean;
  };
  optionsButton: IOptionsButton;

  link: string;
}
