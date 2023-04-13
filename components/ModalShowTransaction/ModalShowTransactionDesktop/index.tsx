import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IEditableTransaction, IModalShowTransaction } from '../index.d';
import {
  RenderAmount,
  RenderCategoryModal,
  RenderCurrency,
  RenderDate,
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
          <RenderCurrency
            isEdit={isEdit}
            AnchorEl={{
              anchorEl: currencyAnchorEl,
              setAnchorEl: setCurrencyAnchorEl,
            }}
            transaction={transaction}
          />

          <RenderType
            isEdit={isEdit}
            AnchorEl={{
              anchorEl: typeAnchorEl,
              setAnchorEl: setTypeAnchorEl,
            }}
            transaction={transaction}
          />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col items-start justify-center gap-2">
            <RenderDate
              isEdit={isEdit}
              AnchorEl={{
                anchorEl: dateAnchorEl,
                setAnchorEl: setDateAnchorEl,
              }}
              transaction={transaction}
            />

            <RenderTransactionName
              data={data}
              setData={setData}
              isEdit={isEdit}
              isMerchantName={isMerchantName}
              setIsMerchantName={setIsMerchantName}
            />
          </div>

          <RenderAmount transaction={transaction} data={data} />
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
