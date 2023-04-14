import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export interface IExpenseCategoryDropdown {
  initialOption: string;
  // eslint-disable-next-line no-unused-vars
  onCategorySelect: (category: string) => void;
}

export type IOption = {
  name: string;
  icon: IconDefinition;
};
