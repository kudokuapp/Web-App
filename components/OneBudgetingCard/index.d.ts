import { HTMLProps, MouseEventHandler, RefObject } from 'react';

export interface IOneBudgetingCard extends HTMLProps<HTMLDivElement> {
  isSelected: boolean;
  selectedAccountRef?: RefObject<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLDivElement>;
  budgeting: {
    id: string;
    userId: string;
    createdAt: string;
    lastUpdate: string;
    budgetTypeId: string;
    budgetName: string;
    latestBudgeting: string | null;
    amount: string;
  };
  token: string;
  user_id: string;
  budgetId: string;

  link: string;
}
