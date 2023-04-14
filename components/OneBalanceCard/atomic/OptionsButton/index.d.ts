import { MouseEventHandler } from 'react';

export interface IOptionsButton {
  editAccount: {
    show: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

  deleteAccount: {
    show: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}
