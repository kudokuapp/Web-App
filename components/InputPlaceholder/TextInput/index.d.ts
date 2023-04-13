export interface ITextInput extends React.ComponentPropsWithoutRef<'input'> {
  error?: boolean;
  errorMessage?: string;
}
