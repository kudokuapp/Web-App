import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { IEditableTransaction, IModalShowTransaction } from '../index.d';
import {
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

const ModalShowTransactionMobile: React.FC<IModalShowTransaction> = ({
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
  const ref = useRef<SheetRef>();

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

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={onCloseModal}
      snapPoints={[800, 400]}
      initialSnap={0}
      onSnap={(snapIndex: any) =>
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
          <RenderTitle
            onCloseModal={onCloseModal}
            onSaveFunction={onSaveEditFunction}
            accountType={accountType}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            transaction={transaction}
          />
        </Sheet.Header>
        <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
          {/* Some content here that makes the sheet content scrollable */}

          <div className={`flex-col px-4 gap-8 flex pb-10`}>
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

            {transaction.transactionType === 'EXPENSE' && (
              <RenderMerchant
                isEdit={isEdit}
                data={data}
                isMerchantName={isMerchantName}
                searchMerchant={{
                  token,
                  firstMerchant: {
                    id: data.merchantId,
                    name: data.merchantName,
                  },
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
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  );
};

export default ModalShowTransactionMobile;
