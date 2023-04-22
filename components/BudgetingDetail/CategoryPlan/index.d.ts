import { HTMLProps } from 'react';

export interface IOneCategoryPlanCard extends HTMLProps<HTMLDivElement> {
  token: string;
  categoryPlan: {
    idCategoryPlan: string;
    budgetId: string;
    createdAt: string;
    lastUpdate: string;
    categoryId: string;
    tagId: string;
    amount: string;
    monthly: boolean;
  };
}
