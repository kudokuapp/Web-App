export interface IPasswordInput
  extends React.ComponentPropsWithoutRef<'input'> {
  error?: boolean;
  errorMessage?: string;
}
