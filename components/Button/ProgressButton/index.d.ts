export interface IProgressButton {
  disabled: boolean;
  text: string;
  onClick: () => void;
  from: IPercentage;
  to: IPercentage;
}

export type IPercentage =
  | '0%'
  | '10%'
  | '20%'
  | '30%'
  | '40%'
  | '50%'
  | '60%'
  | '70%'
  | '80%'
  | '90%'
  | '100%';
