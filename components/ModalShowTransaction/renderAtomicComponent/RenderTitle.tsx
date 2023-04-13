import { faClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { IModalShowTransaction } from '../index.d';

export interface IRenderTitle {
  onCloseModal: MouseEventHandler<HTMLButtonElement>;

  onSaveFunction: (
    // eslint-disable-next-line no-unused-vars
    transaction: IModalShowTransaction['accountType']
  ) => Promise<any>;
  accountType: IModalShowTransaction['accountType'];
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
}

export const RenderTitle: React.FC<IRenderTitle> = ({
  onCloseModal,
  onSaveFunction,
  isEdit,
  transaction,
  setIsEdit,
  accountType,
}) => {
  return (
    <div className="flex justify-between border-b-2 border-gray-500 px-4 py-3">
      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={onCloseModal}
          className="w-[25px] h-[25px] rounded-full text-primary dark:text-primaryDark hover:bg-primary dark:hover:bg-primaryDark hover:text-onPrimary dark:hover:text-onPrimaryDark flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faClose} size={'xl'} />
        </button>
        <p className="font-bold text-onPrimaryContainer dark:text-surfaceVariant text-2xl">
          Transaction Details
        </p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        {!isEdit &&
          transaction.transactionType !== 'RECONCILE' &&
          transaction.transactionType !== 'TRANSFER' && (
            <button
              className="px-2 py-1 rounded-md shadow-md border-2 border-primary dark:border-primaryDark text-onPrimary dark:text-onPrimaryDark hover:bg-primary dark:hover:bg-primaryDark hover:text-onPrimary dark:hover:text-onPrimaryDark bg-primary dark:bg-primaryDark"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}

        {isEdit &&
          transaction.transactionType !== 'RECONCILE' &&
          transaction.transactionType !== 'TRANSFER' && (
            <button
              className="px-2 py-1 rounded-md shadow-md border-2 border-primary dark:border-primaryDark text-onPrimary dark:text-onPrimaryDark hover:bg-primary dark:hover:bg-primaryDark hover:text-onPrimary dark:hover:text-onPrimaryDark bg-primary dark:bg-primaryDark"
              onClick={() => {
                onSaveFunction(accountType);
                setIsEdit(false);
              }}
            >
              Save
            </button>
          )}

        {transaction.transactionType !== 'RECONCILE' &&
          transaction.transactionType !== 'TRANSFER' && (
            <button className="px-2 py-1 rounded-md shadow-md border-2 border-error dark:border-errorDark text-error dark:text-errorDark hover:bg-error dark:hover:bg-errorDark hover:text-onError dark:hover:text-onErrorDark">
              <FontAwesomeIcon icon={faTrashAlt} size={'lg'} />
            </button>
          )}
      </div>
    </div>
  );
};
