'use client';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

type MyObject = {
  id: string;
  debitAccountId: string;
  dateTimestamp: string;
  currency: string;
  amount: string;
  description: string;
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

export default function TransactionDetailsDebit({
  transactionDetail,
}: {
  transactionDetail: {
    id: string;
    debitAccountId: string;
    dateTimestamp: string;
    currency: string;
    amount: string;
    description: string;
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
  const searchParamsName = useSearchParams().get('debitAccount');
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
          </header>
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
              <h4 className="text-xs w-3/4">{transactionDetail.description}</h4>
              <h4 className="text-xs">{rupiah(transactionDetail.amount)}</h4>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 p-4 mt-2">
            <h4 className="text-outline text-sm">Direction</h4>
            <p>{transactionDetail.direction}</p>
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
              className="bg-neutralBackground dark:bg-neutral rounded-sm p-2"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
