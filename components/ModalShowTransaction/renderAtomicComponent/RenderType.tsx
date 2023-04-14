import { Popover } from '@mui/material';
import { IAnchorEl } from './RenderCurrency';

interface IRenderType {
  isEdit: boolean;
  AnchorEl: IAnchorEl;
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
}

export const RenderType: React.FC<IRenderType> = ({
  transaction,
  isEdit,
  AnchorEl,
}) => {
  const { anchorEl, setAnchorEl } = AnchorEl;

  const renderType = () => {
    const name = `${transaction.transactionType.charAt(
      0
    )}${transaction.transactionType.slice(1).toLowerCase()}`;
    if (transaction.transactionType === 'INCOME') {
      return (
        <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-green-500 rounded-lg">
          <p className="text-green-100">{name}</p>
        </div>
      );
    } else if (transaction.transactionType === 'EXPENSE') {
      return (
        <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-red-500 rounded-lg">
          <p className="text-red-100">{name}</p>
        </div>
      );
    } else {
      return (
        <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg">
          <p className="text-gray-100">{name}</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <p className="text-onPrimaryContainer dark:text-surfaceVariant">Type</p>
      <div
        className={`w-fit h-fit ${isEdit ? 'hover:cursor-not-allowed' : ''}`}
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
        {renderType()}

        <Popover
          id="type-over-popover"
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
            Tipe transaksi belum bisa diedit
          </p>
        </Popover>
      </div>
    </div>
  );
};
