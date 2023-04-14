import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export interface IFloatingActionButton {
  actions: {
    icon: IconDefinition;
    onClick: () => void;
    color: string | null;
    textColor: string | null;
    name: string;
  }[];
}
