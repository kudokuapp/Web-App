import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IRenderTags {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
}

export const RenderTags: React.FC<IRenderTags> = ({ transaction }) => {
  const { transactionType, tags } = transaction;
  // const { tags } = data;
  if (transactionType === 'RECONCILE' || transactionType === 'TRANSFER') {
    return <></>;
  } else {
    if (tags !== null) {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-onPrimaryContainer dark:text-surfaceVariant">
            Tags
          </p>
          <div className="border-2 border-gray-500 rounded-md">
            {tags.map((value, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 border-b-2 last:border-b-0 border-gray-500"
                >
                  <div className="border-r-[1px] border-gray-500 p-2">
                    <p className="flex gap-0 bg-primary dark:bg-primaryDark sm:px-2.5 sm:py-0.5 sm:text-base sm:rounded-xl text-xs px-1 py-0 rounded-md  items-center justify-start w-fit h-fit text-onPrimaryContainer sm:max-w-fit max-w-[80px] truncate">
                      <FontAwesomeIcon icon={faHashtag} />
                      {value.name}
                    </p>
                  </div>
                  <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                    <p className="text-primary dark:text-primaryDark">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(Number(value.amount))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <p>Belum ada tags</p>;
    }
  }
};
