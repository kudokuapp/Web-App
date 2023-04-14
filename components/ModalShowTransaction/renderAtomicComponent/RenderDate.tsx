import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@mui/material';
import moment from 'moment';
import { IAnchorEl } from './RenderCurrency';

interface IRenderDate {
  isEdit: boolean;
  AnchorEl: IAnchorEl;
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
}

export const RenderDate: React.FC<IRenderDate> = ({
  isEdit,
  AnchorEl,
  transaction,
}) => {
  const { anchorEl, setAnchorEl } = AnchorEl;

  return (
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
      <p className="text-onPrimaryContainer/70 dark:text-surfaceVariant/70 text-sm flex gap-2 items-center justify-center">
        <FontAwesomeIcon icon={faCalendar} />
        {moment(transaction.dateTimestamp).format('dddd, D MMMM YYYY')}
      </p>
      <Popover
        id="date-over-popover"
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
          Tanggal belum bisa diedit
        </p>
      </Popover>
    </div>
  );
};
