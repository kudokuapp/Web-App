'use client';

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
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Flag from 'react-flags/vendor/flags/flags-iso/flat/svg/ID.svg';

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
}

type EditableTransaction = {
  transactionName: string;
  amount: string;
  merchantId: string;
  merchantName: string;
  category: { name: string; amount: string }[] | null;
  tags: { name: string; amount: string }[] | null;
  notes: string | null;
};

const ModalShowTransaction: React.FC<Props> = ({
  transaction,
  isOpen,
  onCloseModal,
  token,
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
    data.transactionName === data.merchantName
  );

  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [typeAnchorEl, setTypeAnchorEl] = useState<HTMLElement | null>(null);

  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setData({
      transactionName: transaction.transactionName,
      merchantId: transaction.merchantId,
      amount: transaction.amount,
      merchantName: transaction.merchant.name,
      category: transaction.category,
      tags: transaction.tags,
      notes: transaction.notes,
    });

    setIsEdit(false);
  }, [transaction]);

  const showCategory = () => {
    const { category } = transaction;
    if (category !== null) {
      return (
        <div className="flex flex-col gap-1">
          <p className="text-onPrimaryContainer dark:text-surfaceVariant">
            Category
          </p>
          <div className="border-2 border-gray-500 rounded-md">
            {category.map((value, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 border-b-2 last:border-b-0 border-gray-500"
                >
                  <div className="border-r-[1px] border-gray-500 p-2">
                    <RenderCategory category={value.name} />
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
              onChange={() => setIsMerchantName(!isMerchantName)}
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
          />
        </>
      );
    } else {
      if (!isMerchantName) {
        return (
          <div className="flex gap-2 items-center justify-start">
            <RenderActualMerchant
              merchantId={transaction.merchantId}
              merchantName={transaction.merchant.name}
              size={40}
            />
            <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xl">
              {transaction.merchant.name}
            </p>
          </div>
        );
      } else {
        return <></>;
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
          <textarea
            className={`w-full dark:bg-background bg-onPrimaryContainer ${
              transaction.notes
                ? 'dark:text-onBackground text-primaryContainer'
                : 'dark:text-onBackground/70 text-primaryContainer/70'
            } rounded-md px-4 pt-4 pb-10`}
            placeholder={transaction.notes ?? 'Belum ada notes'}
            //  value={text}
            //  onChange={handleTextChange}
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
              transaction.notes
                ? 'dark:text-onBackground text-primaryContainer'
                : 'dark:text-onBackground/70 text-primaryContainer/70'
            } rounded-md px-4 pt-4 pb-10`}
          >
            {transaction.notes ?? 'Belum ada notes'}
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

        {showCategory()}

        {showTags()}

        {transaction.transactionType !== 'RECONCILE' &&
          transaction.transactionType !== 'TRANSFER' &&
          renderNotes()}
      </div>
    </motion.div>
  );
};

export default ModalShowTransaction;
