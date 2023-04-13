import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Flag from 'react-flags/vendor/flags/flags-iso/flat/svg/ID.svg';
import { IEditableTransaction, IModalShowTransaction } from '../index.d';
import {
  RenderCategoryModal,
  RenderMerchant,
  RenderNotes,
  RenderTags,
  RenderTitle,
  RenderTransactionName,
  RenderType,
} from '../renderAtomicComponent';

const ModalShowTransactionDesktop: React.FC<IModalShowTransaction> = ({
  transaction,
  isOpen,
  onCloseModal,
  onSaveEditFunction,
  token,
  accountType,
  onAddMerchant,
  merchantSubscription,
  getAllMerchant,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState<IEditableTransaction>({
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

  return (
    <motion.div
      className="h-[100vh] max-h-[100vh] overflow-y-auto w-fit bg-background/50 dark:bg-onBackground/50 fixed right-0 top-0 flex flex-col gap-10 border-l-4 border-gray-500 pb-10"
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { width: 500 },
        closed: { width: 0 },
      }}
    >
      <RenderTitle
        onCloseModal={onCloseModal}
        onSaveFunction={onSaveEditFunction}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        transaction={transaction}
        accountType={accountType}
      />

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
              <Image src={Flag} alt="Indonesian Flag" height={10} width={20} />
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
              <RenderType transaction={transaction} />

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
            <RenderTransactionName
              data={data}
              setData={setData}
              isEdit={isEdit}
              isMerchantName={isMerchantName}
              setIsMerchantName={setIsMerchantName}
            />
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

        {transaction.transactionType === 'EXPENSE' && (
          <RenderMerchant
            isEdit={isEdit}
            data={data}
            isMerchantName={isMerchantName}
            searchMerchant={{
              token,
              firstMerchant: { id: data.merchantId, name: data.merchantName },
              onSelectMerchant: (selectedMerchant) =>
                setSelectMerchant(selectedMerchant),
              onAddMerchant,
              merchantSubscription,
              getAllMerchant,
            }}
          />
        )}

        <RenderCategoryModal
          transaction={transaction}
          isEdit={isEdit}
          remainingCategory={remainingCategory}
          userTransactionCategory={userTransactionCategory}
          setUserTransactionCategory={setUserTransactionCategory}
        />

        <RenderTags transaction={transaction} />

        {transaction.transactionType !== 'RECONCILE' &&
          transaction.transactionType !== 'TRANSFER' && (
            <RenderNotes isEdit={isEdit} data={data} setData={setData} />
          )}
      </div>
    </motion.div>
  );
};

export default ModalShowTransactionDesktop;
