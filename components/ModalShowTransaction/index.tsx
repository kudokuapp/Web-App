'use client';

import ExpenseCategoryDropdown from '$components/ExpenseCategoryDropdown';
import { RenderCategory } from '$components/OneTransaction/atomic/RenderCategory';
import { RenderActualMerchant } from '$components/OneTransaction/atomic/RenderMerchant';
import SearchMerchant from '$components/SearchMerchant';
import {
  faCalendar,
  faClose,
  faHashtag,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@mui/material';
import { motion } from 'framer-motion';
import _ from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Flag from 'react-flags/vendor/flags/flags-iso/flat/svg/ID.svg';
import { toast, Toaster } from 'react-hot-toast';
import Sheet, { SheetRef } from 'react-modal-sheet';
import {
  editCashTransaction,
  editDebitTransaction,
  editEMoneyTransaction,
  editEWalletTransaction,
  editPayLaterTransaction,
} from './mutation';

interface Props {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;

  isOpen: boolean;
  onCloseModal: () => void;
  token: string;
  accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
}

type EditableTransaction = {
  transactionName: string;
  amount: string;
  merchantId: string;
  merchantName: string;
  category: { name: string; amount: string; amountForDb?: string }[] | null;
  tags: { name: string; amount: string }[] | null;
  notes: string | null;
  isMerchantName?: boolean;
};

const ModalShowTransaction: React.FC<Props> = ({
  transaction,
  isOpen,
  onCloseModal,
  token,
  accountType,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState<EditableTransaction>({
    transactionName: transaction.transactionName,
    merchantId: transaction.merchantId,
    amount: transaction.amount,
    merchantName: transaction.merchant.name,
    category: transaction.category,
    tags: transaction.tags,
    notes: transaction.notes,
  });

  const [isMerchantName, setIsMerchantName] = useState<boolean>(
    transaction.transactionName === transaction.merchant.name
  );

  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [typeAnchorEl, setTypeAnchorEl] = useState<HTMLElement | null>(null);

  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);

  const [userTransactionCategory, setUserTransactionCategory] = useState(
    data.category ? [...data.category] : []
  );

  const [selectMerchant, setSelectMerchant] = useState<{
    name: string;
    id: string;
  } | null>({ name: data.merchantName, id: data.merchantId });

  const [remainingCategory, setRemainingCategory] = useState(0);

  useEffect(() => {
    setData({
      transactionName: transaction.transactionName,
      merchantId: transaction.merchantId,
      amount: transaction.amount,
      merchantName: transaction.merchant.name,
      category: transaction.category
        ? transaction.category.map((value) => {
            return {
              name: value.name,
              amount: value.amount,
              amountForDb: value.amount,
            };
          })
        : null,
      tags: transaction.tags,
      notes: transaction.notes,
    });

    setUserTransactionCategory(
      transaction.category ? [...transaction.category] : []
    );

    if (transaction.transactionName === transaction.merchant.name) {
      setIsMerchantName(true);
    } else {
      setIsMerchantName(false);
    }

    console.log(isMerchantName);

    setIsEdit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  useEffect(() => {
    const oldData = data;
    const newData = { ...oldData };

    newData.merchantId = selectMerchant ? selectMerchant.id : data.merchantId;
    newData.merchantName = selectMerchant
      ? selectMerchant.name
      : data.merchantName;

    setData(newData);
    setIsMerchantName(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMerchant]);

  useEffect(() => {
    if (isMerchantName) {
      const newData = { ...data };

      newData.transactionName = data.merchantName;

      setData({ ...newData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMerchantName]);

  useEffect(() => {
    const totalCategoryAmount = userTransactionCategory.reduce((acc, item) => {
      const amount = item.amountForDb
        ? parseInt(item.amountForDb, 10)
        : Number(item.amount);
      return isNaN(amount) ? acc : acc + amount;
    }, 0);

    setRemainingCategory(Number(data.amount) - totalCategoryAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTransactionCategory]);

  const showTags = () => {
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

  const renderTransactionName = () => {
    if (isEdit) {
      return (
        <>
          <motion.input
            type="text"
            placeholder={
              isMerchantName ? data.merchantName : data.transactionName
            }
            onChange={(e) => {
              const newData = { ...data };

              newData.transactionName = e.currentTarget.value;

              if (e.currentTarget.value === data.merchantName) {
                setIsMerchantName(true);
              }

              if (e.currentTarget.value !== data.merchantName) {
                setIsMerchantName(false);
              }

              setData({ ...newData });
            }}
            className="px-4 py-1 rounded-md font-medium text-lg"
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.label
            className="flex items-start justify-start gap-2"
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="checkbox"
              checked={isMerchantName}
              onChange={() => {
                setIsMerchantName(!isMerchantName);
              }}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-md"
            />
            <span className="text-onPrimaryContainer dark:text-surfaceVariant max-w-[300px]">
              Nama transaksi sama dengan nama merchant
            </span>
          </motion.label>
        </>
      );
    } else {
      if (isMerchantName) {
        return (
          <div className="flex gap-2 items-center justify-start">
            <RenderActualMerchant
              merchantId={data.merchantId}
              merchantName={data.merchantName}
              size={40}
            />
            <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xl">
              {data.merchantName}
            </p>
          </div>
        );
      } else {
        return (
          <p className="text-onPrimaryContainer dark:text-surfaceVariant font-medium text-lg">
            {data.transactionName}
          </p>
        );
      }
    }
  };

  const renderMerchant = () => {
    if (isEdit) {
      return (
        <>
          <SearchMerchant
            token={token}
            firstMerchant={{ name: data.merchantName, id: data.merchantId }}
            onSelectMerchant={setSelectMerchant}
          />
        </>
      );
    } else {
      if (!isMerchantName) {
        return (
          <div className="flex gap-2 items-center justify-start">
            <RenderActualMerchant
              merchantId={data.merchantId}
              merchantName={data.merchantName}
              size={40}
            />
            <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xl">
              {data.merchantName}
            </p>
          </div>
        );
      } else {
        return <></>;
      }
    }
  };

  const renderCategory = () => {
    const { category } = transaction;

    if (category !== null) {
      return (
        <div className="flex flex-col gap-1">
          {isEdit ? (
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Sisa jumlah category:{' '}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(remainingCategory)}
            </p>
          ) : (
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Category
            </p>
          )}

          <div className="border-2 border-gray-500 rounded-md">
            {userTransactionCategory.map((value, index) => {
              const onCategorySelect = (category: string) => {
                const data = [...userTransactionCategory];
                data[index].name = category;
                setUserTransactionCategory(data);
              };
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 border-b-2 last:border-b-0 border-gray-500"
                >
                  {isEdit ? (
                    <div className="border-r-[1px] border-gray-500 p-2">
                      <ExpenseCategoryDropdown
                        initialOption={value.name}
                        onCategorySelect={onCategorySelect}
                      />
                    </div>
                  ) : (
                    <div className="border-r-[1px] border-gray-500 p-2">
                      <RenderCategory category={value.name} select={false} />
                    </div>
                  )}

                  {isEdit ? (
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                        <input
                          type="text"
                          value={value.amount}
                          onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>
                          ) => {
                            const { key } = event;
                            const value = (event.target as HTMLInputElement)
                              .value;
                            const isNumber = /[0-9]/.test(key);
                            const isComma = /[,]/.test(key);
                            const isBackspace = key === 'Backspace';
                            const isDelete = key === 'Delete';
                            const isArrowLeft = key === 'ArrowLeft';
                            const isArrowRight = key === 'ArrowRight';
                            const isHome = key === 'Home';
                            const isEnd = key === 'End';
                            const hasComma = value.indexOf(',') !== -1;

                            if (
                              (!isNumber &&
                                !isComma &&
                                !isBackspace &&
                                !isDelete &&
                                !isArrowLeft &&
                                !isArrowRight &&
                                !isHome &&
                                !isEnd) ||
                              (isComma && hasComma)
                            ) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const data = [...userTransactionCategory];

                            data[index].amount = e.target.value;
                            data[index].amountForDb = e.target.value.replace(
                              ',',
                              '.'
                            );

                            setUserTransactionCategory(data);
                          }}
                        />
                      </div>
                      {value.amountForDb && (
                        <p>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }).format(Number(value.amountForDb))}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                      <p className="text-primary dark:text-primaryDark">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(
                          isNaN(Number(value.amount))
                            ? Number(value.amountForDb)
                            : Number(value.amount)
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {isEdit && (
              <button
                onClick={() => {
                  const newCategory = { name: 'UNDEFINED', amount: '0' };
                  const oldCategory = userTransactionCategory;
                  const category = [...oldCategory, newCategory];
                  const uniqueCategory = _.uniqBy(category, 'name');
                  setUserTransactionCategory(uniqueCategory);

                  console.log(userTransactionCategory);
                }}
              >
                Add new category
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const renderNotes = () => {
    if (isEdit) {
      return (
        <div className="flex flex-col gap-1">
          <label className="text-onPrimaryContainer dark:text-surfaceVariant">
            Notes:
          </label>
          <motion.textarea
            className={`w-full dark:bg-background bg-onPrimaryContainer ${
              data.notes
                ? 'dark:text-onBackground text-primaryContainer'
                : 'dark:text-onBackground/70 text-primaryContainer/70'
            } rounded-md px-4 pt-4 pb-10`}
            placeholder={data.notes ?? 'Belum ada notes'}
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
            value={data.notes ?? ''}
            onChange={(e) => {
              const newData = { ...data };
              newData.notes = e.currentTarget.value;

              setData(newData);
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-onPrimaryContainer dark:text-surfaceVariant">
            Notes
          </p>
          <p
            className={`w-full dark:bg-background bg-onPrimaryContainer ${
              data.notes
                ? 'dark:text-onBackground text-primaryContainer'
                : 'dark:text-onBackground/70 text-primaryContainer/70'
            } rounded-md px-4 pt-4 pb-10`}
          >
            {data.notes ?? 'Belum ada notes'}
          </p>
        </div>
      );
    }
  };

  return (
    <motion.div
      className="h-[100vh] max-h-[100vh] overflow-y-auto w-fit bg-background/50 dark:bg-onBackground/50 fixed right-0 top-0 flex flex-col gap-10 border-l-4 border-gray-500 pb-10"
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { width: 500 },
        closed: { width: 0 },
      }}
    >
      <Toaster position="bottom-right" />
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
                  const category = data.category
                    ? data.category.map((value) => {
                        return {
                          name: value.name,
                          amount: value.amount,
                        };
                      })
                    : [{ name: 'UNDEFINED', amount: transaction.amount }];

                  const selectFunction = ({
                    token,
                    transactionId,
                    transactionName,
                    category,
                    merchantId,
                    notes,
                  }: {
                    token: string;
                    transactionId: string;
                    transactionName: string;
                    merchantId: string;
                    category: { name: string; amount: string }[];
                    notes: string | null;
                  }) => {
                    if (accountType === 'cash') {
                      return editCashTransaction({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      });
                    } else if (accountType === 'debit') {
                      return editDebitTransaction({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      });
                    } else if (accountType === 'emoney') {
                      return editEMoneyTransaction({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      });
                    } else if (accountType === 'ewallet') {
                      return editEWalletTransaction({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      });
                    } else if (accountType === 'paylater') {
                      return editPayLaterTransaction({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      });
                    } else {
                      return editCashTransaction({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      });
                    }
                  };

                  toast
                    .promise(
                      selectFunction({
                        token,
                        transactionId: transaction.id,
                        transactionName: data.transactionName,
                        category,
                        merchantId: data.merchantId,
                        notes:
                          data.notes === '' ||
                          data.notes === undefined ||
                          data.notes === null
                            ? null
                            : data.notes,
                      }),
                      {
                        loading: 'Menyimpan transaksi...',
                        success: 'Transaksi berhasil disimpan!',
                        error: 'Transaksi gagal disimpan',
                      }
                    )
                    .then(
                      () => {
                        // window.location.reload();
                      },
                      (e) => {
                        console.log(e);
                        window.location.reload();
                      }
                    );

                  setIsEdit(false);
                  console.log(data);
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

      <div className={`flex-col px-4 gap-8 flex`}>
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col items-start justify-center">
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Currency
            </p>
            <div
              className={`flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg ${
                isEdit ? 'hover:cursor-not-allowed' : ''
              }`}
              aria-owns={currencyAnchorEl ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => {
                if (isEdit) {
                  setCurrencyAnchorEl(event.currentTarget);
                }
              }}
              onMouseLeave={() => {
                setCurrencyAnchorEl(null);
              }}
            >
              <Image src={Flag} alt="Indonesian Flag" height={10} />
              <p className="text-gray-100">{transaction.currency}</p>
              <Popover
                id="currency-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={Boolean(currencyAnchorEl)}
                anchorEl={currencyAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => {
                  setCurrencyAnchorEl(null);
                }}
                disableRestoreFocus
              >
                <p className="bg-onBackground/50 text-white px-4 py-0.5">
                  Currency belum bisa diedit
                </p>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Type
            </p>
            <div
              className={`w-fit h-fit ${
                isEdit ? 'hover:cursor-not-allowed' : ''
              }`}
              aria-owns={typeAnchorEl ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => {
                if (isEdit) {
                  setTypeAnchorEl(event.currentTarget);
                }
              }}
              onMouseLeave={() => {
                setTypeAnchorEl(null);
              }}
            >
              {renderType()}

              <Popover
                id="type-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={Boolean(typeAnchorEl)}
                anchorEl={typeAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => {
                  setTypeAnchorEl(null);
                }}
                disableRestoreFocus
              >
                <p className="bg-onBackground/50 text-white px-4 py-0.5">
                  Tipe transaksi belum bisa diedit
                </p>
              </Popover>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col items-start justify-center gap-2">
            <div
              className={`w-fit h-fit ${
                isEdit ? 'hover:cursor-not-allowed' : ''
              }`}
              aria-owns={dateAnchorEl ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => {
                if (isEdit) {
                  setDateAnchorEl(event.currentTarget);
                }
              }}
              onMouseLeave={() => {
                setDateAnchorEl(null);
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
                open={Boolean(dateAnchorEl)}
                anchorEl={dateAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => {
                  setDateAnchorEl(null);
                }}
                disableRestoreFocus
              >
                <p className="bg-onBackground/50 text-white px-4 py-0.5">
                  Tanggal belum bisa diedit
                </p>
              </Popover>
            </div>
            {renderTransactionName()}
          </div>
          <p
            className={`font-medium text-lg ${
              transaction.direction === 'IN'
                ? 'dark:text-green-300 text-green-600'
                : 'text-onPrimaryContainer dark:text-surfaceVariant'
            }`}
          >
            {transaction.direction === 'IN' ? '+' : ''}
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(Number(data.amount))}
          </p>
        </div>

        {transaction.transactionType === 'EXPENSE' && renderMerchant()}

        {renderCategory()}

        {showTags()}

        {transaction.transactionType !== 'RECONCILE' &&
          transaction.transactionType !== 'TRANSFER' &&
          renderNotes()}
      </div>
    </motion.div>
  );
};

export default ModalShowTransaction;

export const ModalShowTransactionMobile: React.FC<Props> = ({
  transaction,
  isOpen,
  onCloseModal,
  token,
  accountType,
}) => {
  const ref = useRef<SheetRef>();

  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState<EditableTransaction>({
    transactionName: transaction.transactionName,
    merchantId: transaction.merchantId,
    amount: transaction.amount,
    merchantName: transaction.merchant.name,
    category: transaction.category,
    tags: transaction.tags,
    notes: transaction.notes,
  });

  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [typeAnchorEl, setTypeAnchorEl] = useState<HTMLElement | null>(null);

  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);

  const [isMerchantName, setIsMerchantName] = useState<boolean>(
    transaction.transactionName === transaction.merchant.name
  );

  const [selectMerchant, setSelectMerchant] = useState<{
    name: string;
    id: string;
  } | null>({ name: data.merchantName, id: data.merchantId });

  const [remainingCategory, setRemainingCategory] = useState(0);

  const [userTransactionCategory, setUserTransactionCategory] = useState(
    data.category ? [...data.category] : []
  );

  useEffect(() => {
    setData({
      transactionName: transaction.transactionName,
      merchantId: transaction.merchantId,
      amount: transaction.amount,
      merchantName: transaction.merchant.name,
      category: transaction.category
        ? transaction.category.map((value) => {
            return {
              name: value.name,
              amount: value.amount,
              amountForDb: value.amount,
            };
          })
        : null,
      tags: transaction.tags,
      notes: transaction.notes,
    });

    setUserTransactionCategory(
      transaction.category ? [...transaction.category] : []
    );

    if (transaction.transactionName === transaction.merchant.name) {
      setIsMerchantName(true);
    } else {
      setIsMerchantName(false);
    }

    console.log(isMerchantName);

    setIsEdit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  useEffect(() => {
    const oldData = data;
    const newData = { ...oldData };

    newData.merchantId = selectMerchant ? selectMerchant.id : data.merchantId;
    newData.merchantName = selectMerchant
      ? selectMerchant.name
      : data.merchantName;

    setData(newData);
    setIsMerchantName(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMerchant]);

  useEffect(() => {
    if (isMerchantName) {
      const newData = { ...data };

      newData.transactionName = data.merchantName;

      setData({ ...newData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMerchantName]);

  useEffect(() => {
    const totalCategoryAmount = userTransactionCategory.reduce((acc, item) => {
      const amount = item.amountForDb
        ? parseInt(item.amountForDb, 10)
        : Number(item.amount);
      return isNaN(amount) ? acc : acc + amount;
    }, 0);

    setRemainingCategory(Number(data.amount) - totalCategoryAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTransactionCategory]);

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

  const renderTransactionName = () => {
    if (isEdit) {
      return (
        <>
          <motion.input
            type="text"
            placeholder={
              isMerchantName ? data.merchantName : data.transactionName
            }
            onChange={(e) => {
              const newData = { ...data };

              newData.transactionName = e.currentTarget.value;

              if (e.currentTarget.value === data.merchantName) {
                setIsMerchantName(true);
              }

              if (e.currentTarget.value !== data.merchantName) {
                setIsMerchantName(false);
              }

              setData({ ...newData });
            }}
            className="px-4 py-1 rounded-md font-medium text-lg"
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.label
            className="flex items-start justify-start gap-2"
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="checkbox"
              checked={isMerchantName}
              onChange={() => {
                setIsMerchantName(!isMerchantName);
              }}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-md"
            />
            <span className="text-onPrimaryContainer max-w-[300px]">
              Nama transaksi sama dengan nama merchant
            </span>
          </motion.label>
        </>
      );
    } else {
      if (isMerchantName) {
        return (
          <div className="flex gap-2 items-center justify-start">
            <RenderActualMerchant
              merchantId={data.merchantId}
              merchantName={data.merchantName}
              size={40}
            />
            <p className="text-onPrimaryContainer text-xl">
              {data.merchantName}
            </p>
          </div>
        );
      } else {
        return (
          <p className="text-onPrimaryContainer font-medium text-lg">
            {data.transactionName}
          </p>
        );
      }
    }
  };

  const renderMerchant = () => {
    if (isEdit) {
      return (
        <>
          <SearchMerchant
            token={token}
            firstMerchant={{ name: data.merchantName, id: data.merchantId }}
            onSelectMerchant={setSelectMerchant}
          />
        </>
      );
    } else {
      if (!isMerchantName) {
        return (
          <div className="flex gap-2 items-center justify-start">
            <RenderActualMerchant
              merchantId={data.merchantId}
              merchantName={data.merchantName}
              size={40}
            />
            <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xl">
              {data.merchantName}
            </p>
          </div>
        );
      } else {
        return <></>;
      }
    }
  };

  const renderCategory = () => {
    const { category } = transaction;

    if (category !== null) {
      return (
        <div className="flex flex-col gap-1">
          {isEdit ? (
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Sisa jumlah category:{' '}
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(remainingCategory)}
            </p>
          ) : (
            <p className="text-onPrimaryContainer dark:text-surfaceVariant">
              Category
            </p>
          )}

          <div className="border-2 border-gray-500 rounded-md">
            {userTransactionCategory.map((value, index) => {
              const onCategorySelect = (category: string) => {
                const data = [...userTransactionCategory];
                data[index].name = category;
                setUserTransactionCategory(data);
              };
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 border-b-2 last:border-b-0 border-gray-500"
                >
                  {isEdit ? (
                    <div className="border-r-[1px] border-gray-500 p-2">
                      <ExpenseCategoryDropdown
                        initialOption={value.name}
                        onCategorySelect={onCategorySelect}
                      />
                    </div>
                  ) : (
                    <div className="border-r-[1px] border-gray-500 p-2">
                      <RenderCategory category={value.name} select={false} />
                    </div>
                  )}

                  {isEdit ? (
                    <div className="flex flex-col gap-1">
                      <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                        <input
                          type="text"
                          value={value.amount}
                          onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>
                          ) => {
                            const { key } = event;
                            const value = (event.target as HTMLInputElement)
                              .value;
                            const isNumber = /[0-9]/.test(key);
                            const isComma = /[,]/.test(key);
                            const isBackspace = key === 'Backspace';
                            const isDelete = key === 'Delete';
                            const isArrowLeft = key === 'ArrowLeft';
                            const isArrowRight = key === 'ArrowRight';
                            const isHome = key === 'Home';
                            const isEnd = key === 'End';
                            const hasComma = value.indexOf(',') !== -1;

                            if (
                              (!isNumber &&
                                !isComma &&
                                !isBackspace &&
                                !isDelete &&
                                !isArrowLeft &&
                                !isArrowRight &&
                                !isHome &&
                                !isEnd) ||
                              (isComma && hasComma)
                            ) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const data = [...userTransactionCategory];

                            data[index].amount = e.target.value;
                            data[index].amountForDb = e.target.value.replace(
                              ',',
                              '.'
                            );

                            setUserTransactionCategory(data);
                          }}
                        />
                      </div>
                      {value.amountForDb && (
                        <p>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }).format(Number(value.amountForDb))}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                      <p className="text-primary dark:text-primaryDark">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(
                          isNaN(Number(value.amount))
                            ? Number(value.amountForDb)
                            : Number(value.amount)
                        )}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {isEdit && (
              <button
                onClick={() => {
                  const newCategory = { name: 'UNDEFINED', amount: '0' };
                  const oldCategory = userTransactionCategory;
                  const category = [...oldCategory, newCategory];
                  const uniqueCategory = _.uniqBy(category, 'name');
                  setUserTransactionCategory(uniqueCategory);

                  console.log(userTransactionCategory);
                }}
              >
                Add new category
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const showTags = () => {
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

  const renderNotes = () => {
    if (isEdit) {
      return (
        <div className="flex flex-col gap-1">
          <label className="text-onPrimaryContainer dark:text-surfaceVariant">
            Notes:
          </label>
          <motion.textarea
            className={`w-full dark:bg-background bg-onPrimaryContainer ${
              data.notes
                ? 'dark:text-onBackground text-primaryContainer'
                : 'dark:text-onBackground/70 text-primaryContainer/70'
            } rounded-md px-4 pt-4 pb-10`}
            placeholder={data.notes ?? 'Belum ada notes'}
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
            value={data.notes ?? ''}
            onChange={(e) => {
              const newData = { ...data };
              newData.notes = e.currentTarget.value;

              setData(newData);
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-onPrimaryContainer dark:text-surfaceVariant">
            Notes
          </p>
          <p
            className={`w-full dark:bg-background bg-onPrimaryContainer ${
              data.notes
                ? 'dark:text-onBackground text-primaryContainer'
                : 'dark:text-onBackground/70 text-primaryContainer/70'
            } rounded-md px-4 pt-4 pb-10`}
          >
            {data.notes ?? 'Belum ada notes'}
          </p>
        </div>
      );
    }
  };

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={onCloseModal}
      snapPoints={[800, 400]}
      initialSnap={0}
      onSnap={(snapIndex) =>
        console.log('> Current snap point index:', snapIndex)
      }
      style={{ zIndex: 30 }}
    >
      <Sheet.Container>
        {/**
         * Since `Sheet.Content` is a `motion.div` it can receive motion values
         * in it's style prop which allows us to utilise the exposed `y` value.
         *
         * By syncing the padding bottom with the `y` motion value we introduce
         * an offset that ensures that the sheet content can be scrolled all the
         * way to the bottom in every snap point.
         */}
        <Toaster position="top-right" />
        <Sheet.Header>
          <div className="flex justify-between border-b-2 border-gray-500 px-4 py-3">
            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={onCloseModal}
                className="w-[25px] h-[25px] rounded-full text-primary flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faClose} size={'xl'} />
              </button>
              <p className="font-bold text-onPrimaryContainer text-2xl">
                Transaction Details
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              {!isEdit &&
                transaction.transactionType !== 'RECONCILE' &&
                transaction.transactionType !== 'TRANSFER' && (
                  <button
                    className="px-2 py-1 rounded-md shadow-md border-2 border-primary text-onPrimary bg-primary"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </button>
                )}

              {isEdit &&
                transaction.transactionType !== 'RECONCILE' &&
                transaction.transactionType !== 'TRANSFER' && (
                  <button
                    className="px-2 py-1 rounded-md shadow-md border-2 border-primary text-onPrimary bg-primary"
                    onClick={() => {
                      const category = data.category
                        ? data.category.map((value) => {
                            return {
                              name: value.name,
                              amount: value.amount,
                            };
                          })
                        : [{ name: 'UNDEFINED', amount: transaction.amount }];

                      const selectFunction = ({
                        token,
                        transactionId,
                        transactionName,
                        category,
                        merchantId,
                        notes,
                      }: {
                        token: string;
                        transactionId: string;
                        transactionName: string;
                        merchantId: string;
                        category: { name: string; amount: string }[];
                        notes: string | null;
                      }) => {
                        if (accountType === 'cash') {
                          return editCashTransaction({
                            token,
                            transactionId,
                            transactionName,
                            category,
                            merchantId,
                            notes,
                          });
                        } else if (accountType === 'debit') {
                          return editDebitTransaction({
                            token,
                            transactionId,
                            transactionName,
                            category,
                            merchantId,
                            notes,
                          });
                        } else if (accountType === 'emoney') {
                          return editEMoneyTransaction({
                            token,
                            transactionId,
                            transactionName,
                            category,
                            merchantId,
                            notes,
                          });
                        } else if (accountType === 'ewallet') {
                          return editEWalletTransaction({
                            token,
                            transactionId,
                            transactionName,
                            category,
                            merchantId,
                            notes,
                          });
                        } else if (accountType === 'paylater') {
                          return editPayLaterTransaction({
                            token,
                            transactionId,
                            transactionName,
                            category,
                            merchantId,
                            notes,
                          });
                        } else {
                          return editCashTransaction({
                            token,
                            transactionId,
                            transactionName,
                            category,
                            merchantId,
                            notes,
                          });
                        }
                      };

                      toast
                        .promise(
                          selectFunction({
                            token,
                            transactionId: transaction.id,
                            transactionName: data.transactionName,
                            category,
                            merchantId: data.merchantId,
                            notes:
                              data.notes === '' ||
                              data.notes === undefined ||
                              data.notes === null
                                ? null
                                : data.notes,
                          }),
                          {
                            loading: 'Menyimpan transaksi...',
                            success: 'Transaksi berhasil disimpan!',
                            error: 'Transaksi gagal disimpan',
                          }
                        )
                        .then(
                          () => {
                            // window.location.reload();
                          },
                          (e) => {
                            console.log(e);
                            // window.location.reload();
                          }
                        );

                      setIsEdit(false);
                      console.log(data);
                    }}
                  >
                    Save
                  </button>
                )}

              {transaction.transactionType !== 'RECONCILE' &&
                transaction.transactionType !== 'TRANSFER' && (
                  <button className="px-2 py-1 rounded-md shadow-md border-2 border-error text-error">
                    <FontAwesomeIcon icon={faTrashAlt} size={'lg'} />
                  </button>
                )}
            </div>
          </div>
        </Sheet.Header>
        <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
          {/* Some content here that makes the sheet content scrollable */}

          <div className={`flex-col px-4 gap-8 flex pb-10`}>
            <div className="flex gap-4 justify-between">
              <div className="flex flex-col items-start justify-center">
                <p className="text-onPrimaryContainer">Currency</p>
                <div
                  className={`flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg ${
                    isEdit ? 'hover:cursor-not-allowed' : ''
                  }`}
                  aria-owns={
                    currencyAnchorEl ? 'mouse-over-popover' : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={(event) => {
                    if (isEdit) {
                      setCurrencyAnchorEl(event.currentTarget);
                    }
                  }}
                  onMouseLeave={() => {
                    setCurrencyAnchorEl(null);
                  }}
                >
                  <Image src={Flag} alt="Indonesian Flag" height={10} />
                  <p className="text-gray-100">{transaction.currency}</p>
                  <Popover
                    id="currency-over-popover"
                    sx={{
                      pointerEvents: 'none',
                    }}
                    open={Boolean(currencyAnchorEl)}
                    anchorEl={currencyAnchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={() => {
                      setCurrencyAnchorEl(null);
                    }}
                    disableRestoreFocus
                  >
                    <p className="bg-onBackground/50 text-white px-4 py-0.5">
                      Currency belum bisa diedit
                    </p>
                  </Popover>
                </div>
              </div>

              <div className="flex flex-col items-start justify-center">
                <p className="text-onPrimaryContainer">Type</p>
                <div
                  className={`w-fit h-fit ${
                    isEdit ? 'hover:cursor-not-allowed' : ''
                  }`}
                  aria-owns={typeAnchorEl ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => {
                    if (isEdit) {
                      setTypeAnchorEl(event.currentTarget);
                    }
                  }}
                  onMouseLeave={() => {
                    setTypeAnchorEl(null);
                  }}
                >
                  {renderType()}

                  <Popover
                    id="type-over-popover"
                    sx={{
                      pointerEvents: 'none',
                    }}
                    open={Boolean(typeAnchorEl)}
                    anchorEl={typeAnchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={() => {
                      setTypeAnchorEl(null);
                    }}
                    disableRestoreFocus
                  >
                    <p className="bg-onBackground/50 text-white px-4 py-0.5">
                      Tipe transaksi belum bisa diedit
                    </p>
                  </Popover>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col items-start justify-center gap-2">
                <div
                  className={`w-fit h-fit ${
                    isEdit ? 'hover:cursor-not-allowed' : ''
                  }`}
                  aria-owns={dateAnchorEl ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => {
                    if (isEdit) {
                      setDateAnchorEl(event.currentTarget);
                    }
                  }}
                  onMouseLeave={() => {
                    setDateAnchorEl(null);
                  }}
                >
                  <p className="text-onPrimaryContainer/70/70 text-sm flex gap-2 items-center justify-center">
                    <FontAwesomeIcon icon={faCalendar} />
                    {moment(transaction.dateTimestamp).format(
                      'dddd, D MMMM YYYY'
                    )}
                  </p>
                  <Popover
                    id="date-over-popover"
                    sx={{
                      pointerEvents: 'none',
                    }}
                    open={Boolean(dateAnchorEl)}
                    anchorEl={dateAnchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={() => {
                      setDateAnchorEl(null);
                    }}
                    disableRestoreFocus
                  >
                    <p className="bg-onBackground/50 text-white px-4 py-0.5">
                      Tanggal belum bisa diedit
                    </p>
                  </Popover>
                </div>
                {renderTransactionName()}
              </div>
              <p
                className={`font-medium text-lg ${
                  transaction.direction === 'IN'
                    ? 'text-green-600'
                    : 'text-onPrimaryContainer'
                }`}
              >
                {transaction.direction === 'IN' ? '+' : ''}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(Number(data.amount))}
              </p>
            </div>

            {transaction.transactionType === 'EXPENSE' && renderMerchant()}

            {renderCategory()}

            {showTags()}

            {transaction.transactionType !== 'RECONCILE' &&
              transaction.transactionType !== 'TRANSFER' &&
              renderNotes()}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  );
};
