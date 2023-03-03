'use client';
import { useMutation } from '@apollo/client';
import { faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { mutationDeleteCashTransaction } from '../../mutation';

type MyObject = {
  id: string;
  cashAccountId: string;
  dateTimestamp: string;
  currency: string;
  amount: string;
  transactionName: string;
  merchantId: string;
  category: [{ name: string; amount: string }];
  transactionType: string;
  internalTransferAccountId: any;
  direction: string;
  notes: string;
  location: any;
  tags: [];
  isHideFromBudget: boolean;
  isHideFromInsight: boolean;
  merchant: { id: string; name: string; picture: string; url: string };
};

export default function TransactionDetails({
  transactionDetail,
}: {
  transactionDetail: {
    id: string;
    cashAccountId: string;
    dateTimestamp: string;
    currency: string;
    amount: string;
    transactionName: string;
    merchantId: string;
    category: [{ name: string; amount: string }];
    transactionType: string;
    internalTransferAccountId: any;
    direction: string;
    notes: string;
    location: any;
    tags: [];
    isHideFromBudget: boolean;
    isHideFromInsight: boolean;
    merchant: { id: string; name: string; picture: string; url: string };
  };
}) {
  const [isHiddenTransaction, setIsHiddenTransaction] = useState(true);
  const [isDeleteTransaction, setIsDeleteTransaction] = useState(false);
  const searchParamsName = useSearchParams().get('cashAccount');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };
  const rupiah = (number: any) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  const [deleteCashTransaction] = useMutation(mutationDeleteCashTransaction, {
    variables: {
      transactionId: transactionDetail.id,
    },
  });
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsHiddenTransaction(false);
    }
    if (window.innerWidth > 640) {
      setIsHiddenTransaction(true);
    }
  }, []);
  return (
    <>
      {isHiddenTransaction ? (
        <div className="flex flex-col w-5/12 gap-4">
          <header className="bg-onPrimary dark:bg-onBackground p-4 border-b-2 border-outline flex justify-between align-middle items-center">
            {isDeleteTransaction ? (
              <Toaster
                position="top-right"
                containerStyle={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              />
            ) : (
              <></>
            )}
            <h2 className="text-primary dark:text-primaryDark font-bold text-xl">
              Transaction Details
            </h2>
            <button
              onClick={() => {
                setIsDeleteTransaction(true);
                const deleteTransactionCash = () => {
                  return new Promise((resolve, reject) => {
                    deleteCashTransaction()
                      .then((res: any) => {
                        resolve(res);
                      })
                      .catch((error) => {
                        reject(error);
                      });
                  });
                };
                toast
                  .promise(deleteCashTransaction(), {
                    loading: 'Loading...',
                    success: 'Transaksi berhasil dihapus!',
                    error: 'Transaksi gagal dihapus!',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }}
              className="border-2 text-error py-1 border-error px-2 rounded-md"
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </button>
          </header>
          <div className="h-screen">
            <div className="flex flex-row justify-start gap-8 p-4 mt-2">
              <div className="flex flex-col justify-start">
                <h4 className="text-outline text-sm">Account</h4>
                <h4>{searchParamsName}</h4>
              </div>
              <div className="flex flex-col justify-start">
                <h4 className="text-outline text-sm">Transaction Type</h4>
                <h4>{transactionDetail.transactionType}</h4>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-2 p-4 mt-2">
              <h4 className="text-outline text-sm">
                <FontAwesomeIcon icon={faCalendar} size="lg" />{' '}
                {formatDate(transactionDetail.dateTimestamp)}
              </h4>

              <div className="flex flex-row justify-between">
                <h4>{transactionDetail.transactionName}</h4>
                <h4>{rupiah(transactionDetail.amount).replace(/\s/g, '')}</h4>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-2 p-4 mt-2">
              <h4 className="text-outline text-sm">Category</h4>
              <p>
                {transactionDetail.category
                  ? transactionDetail.category[0].name
                  : transactionDetail.transactionType}
              </p>
            </div>
            <hr className="p-2 mx-4 text-outline" />
            <div className="flex flex-col justify-between gap-2 p-4 mt-2">
              <h4 className="text-outline text-sm">Notes</h4>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                disabled
                value={transactionDetail.notes}
                className="bg-neutralBackground border-outline border-2 dark:bg-neutral rounded-sm p-2"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
