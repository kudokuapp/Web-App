import { PopupButton } from '@typeform/embed-react';

export const Typeform = ({
  email,
  handleSubmit,
}: {
  email: string;
  handleSubmit: () => void;
}) => {
  return (
    <PopupButton
      id="e6haAlGW"
      hidden={{
        index: '2',
        email,
      }}
      onSubmit={handleSubmit}
      className="px-2 py-2 cursor-pointer rounded-md shadow-md bg-primary text-onPrimary dark:bg-primaryDark dark:text-onPrimaryDark text-xl w-full font-bold"
    >
      Isi Form
    </PopupButton>
  );
};
