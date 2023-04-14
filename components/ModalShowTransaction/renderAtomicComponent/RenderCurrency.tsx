import { Popover } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import Flag from 'react-flags/vendor/flags/flags-iso/flat/svg/ID.svg';

interface IRenderCurrency {
  isEdit: boolean;
  AnchorEl: IAnchorEl;
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
}

export type IAnchorEl = {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
};

export const RenderCurrency: React.FC<IRenderCurrency> = ({
  isEdit,
  AnchorEl,
  transaction,
}) => {
  const { anchorEl, setAnchorEl } = AnchorEl;

  return (
    <div className="flex flex-col items-start justify-center">
      <p className="text-onPrimaryContainer dark:text-surfaceVariant">
        Currency
      </p>
      <div
        className={`flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg ${
          isEdit ? 'hover:cursor-not-allowed' : ''
        }`}
        aria-owns={anchorEl ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={(event) => {
          if (isEdit) {
            setAnchorEl(event.currentTarget);
          }
        }}
        onMouseLeave={() => {
          setAnchorEl(null);
        }}
      >
        <Image src={Flag} alt="Indonesian Flag" height={10} width={20} />
        <p className="text-gray-100">{transaction.currency}</p>
        <Popover
          id="currency-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={() => {
            setAnchorEl(null);
          }}
          disableRestoreFocus
        >
          <p className="bg-onBackground/50 text-white px-4 py-0.5">
            Currency belum bisa diedit
          </p>
        </Popover>
      </div>
    </div>
  );
};
