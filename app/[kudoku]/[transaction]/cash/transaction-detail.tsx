'use client';
import { useMutation } from '@apollo/client';
import { faCalendar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'next/navigation';
import { FormEventHandler, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  mutationDeleteCashTransaction,
  mutationEditCashTransaction,
} from '../../mutation';

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
  const [isDisabled, setIsDisabled] = useState(true);
  const [isIncome, setIsIncome] = useState(false);
  const searchParamsName = useSearchParams().get('cashAccount');
  const [dataCategory, setDataCategory] = useState(['']);
  const [className, setClassName] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [transactionName, setTransactionName] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [direction, setDirection] = useState('OUT');
  const [nominal, setNominal] = useState('');
  const [showCategory, setShowCategory] = useState(true);
  const [notes, setNotes] = useState('');
  const [editCashTransaction] = useMutation(mutationEditCashTransaction, {
    variables: {
      amount: nominal,
      transactionName: transactionName,
      transactionId: transactionId,
      currency: 'IDR',
      transactionType: type,
      direction: direction,
      isHideFromBudget: false,
      isHideFromInsight: false,
      merchantId: '63d3be20009767d5eb7e74e9',
      notes: notes,
      tags: [''],
      category: [{ amount: nominal, name: categoryName }],
    },
  });
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

  const setData = () => {
    setTransactionId(transactionDetail.id.toString());
    setType(transactionDetail.transactionType);
    setCategoryName(transactionDetail.category[0].name);
    setNominal(transactionDetail.amount);
    setTransactionName(transactionDetail.transactionName);
    setDirection(transactionDetail.direction);
    setNotes(transactionDetail.notes);
  };
  useEffect(() => {
    setData();
    if (transactionDetail.transactionType === 'EXPENSE') {
      setIsIncome(false);
      setDataCategory([
        'Food & beverages',
        'Vehicle',
        'Restaurants',
        'Clothing',
        'Groceries',
        'Healthcare',
        'Gym',
        'Rent',
        'Shops',
        'Subscriptions',
        'Transportation',
        'Travel & vacation',
        'Work expenses',
      ]);
    }
    if (transactionDetail.transactionType === 'INCOME') {
      setIsIncome(true);
      setDataCategory(['Salary', 'Gift', 'Interest']);
    }
    if (window.innerWidth <= 640) {
      setIsHiddenTransaction(false);
    }
    if (window.innerWidth > 640) {
      setIsHiddenTransaction(true);
    }
    if (isDisabled) {
      setClassName(
        'font-normal p-2 border-2 border-outline w-full h-full rounded-xl shadow-md mt-4 dark:bg-neutral'
      );
    } else {
      setClassName(
        'font-normal w-full h-full rounded-xl shadow-md mt-4 p-2 border-4 border-outline dark:border-surface focus-within:border-primary dark:focus-within:border-secondaryDark bg-onPrimary dark:bg-onSurfaceVariant'
      );
    }
  }, [transactionDetail, isDisabled]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const editTransactionCash = () => {
      return new Promise((resolve, reject) => {
        editCashTransaction()
          .then((res: any) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    toast
      .promise(editTransactionCash(), {
        loading: 'Loading...',
        success: 'Transaksi berhasil diupdate!',
        error: 'Transaksi gagal diupdate!',
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <>
      {isHiddenTransaction ? (
        <div className="flex flex-col w-5/12 gap-4">
          <header className="bg-onPrimary dark:bg-onBackground p-4 border-b-2 border-outline flex justify-between align-middle items-center">
            <Toaster
              position="top-right"
              containerStyle={{
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            />
            <h2 className="text-primary dark:text-primaryDark font-bold text-xl">
              Transaction Details
            </h2>
            <div className="gap-x-2 flex">
              <button
                onClick={() => {
                  setIsDisabled(false);
                }}
                className="border-2 py-1 px-2 rounded-md"
              >
                <FontAwesomeIcon icon={faEdit} size="sm" />
              </button>
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
            </div>
          </header>
          <form className="h-screen" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start gap-8 p-4 mt-2">
              <div className="flex flex-col justify-start">
                <h4 className="text-outline text-sm mb-2">Account</h4>
                <h4>{searchParamsName}</h4>
              </div>
              <div className="flex flex-col justify-start">
                <h4 className="text-outline text-sm mb-2">Transaction Type</h4>
                <select
                  onChange={(e) => {
                    setType(e.target.value);
                    if (e.target.value === 'EXPENSE') {
                      setIsIncome(false);
                    }
                    if (e.target.value === 'INCOME') {
                      setIsIncome(true);
                    }
                  }}
                  value={type}
                  disabled={isDisabled}
                  className="bg-background dark:bg-outline px-2 py-1 text-sm rounded"
                >
                  <option className="px-2 py-1" value="EXPENSE">
                    Expense
                  </option>
                  <option value="INCOME">Income</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-between p-4 mt-2">
              <h4 className="text-outline text-sm">
                <FontAwesomeIcon icon={faCalendar} size="lg" />{' '}
                {formatDate(transactionDetail.dateTimestamp)}
              </h4>

              <div className="flex flex-row justify-between gap-x-2">
                <div className="w-fit h-fit">
                  <input
                    id="transactionName"
                    disabled={isDisabled}
                    className={`${className}`}
                    value={transactionName}
                    onChange={(e) => {
                      setTransactionName(e.target.value);
                    }}
                  />
                </div>
                <div className="w-fit h-fit">
                  <div className={`${className} flex flex-row`}>
                    <p>Rp</p>
                    <input
                      id="nominal"
                      disabled={isDisabled}
                      className="bg-transparent outline-none"
                      value={nominal}
                      onChange={(e) => {
                        setNominal(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-x-2 p-4 mt-2">
              <h4 className="text-outline text-sm">Category</h4>
              <select
                className="bg-background dark:bg-outline p-2 text-sm rounded"
                value={categoryName}
                disabled={isDisabled}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              >
                {dataCategory.map((item) => (
                  <option className="px-2 py-1" value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <hr className="p-2 mx-4 text-outline" />
            <div className="flex flex-col justify-between gap-2 p-4 mt-2">
              <h4 className="text-outline text-sm">Notes</h4>
              <textarea
                name=""
                id=""
                cols={30}
                rows={3}
                disabled={isDisabled}
                value={notes}
                className={className}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
            {!isDisabled ? (
              <div className="flex flex-col w-full justify-center gap-y-4 p-4">
                <button className="p-2 border-2 rounded-md dark:border-primaryDark w-full bg-primary font-bold text-onPrimary border-primary dark:text-primary dark:bg-primaryDark">
                  Save
                </button>
                <button
                  className="p-2 border-2 rounded-md w-full hover:bg-errorContainer font-bold dark:hover:text-error"
                  onClick={() => {
                    setIsDisabled(true);
                    setData();
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
