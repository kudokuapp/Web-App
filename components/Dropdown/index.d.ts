export interface IDropdown {
  options: { value: string; label: string }[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: string) => void;
}
