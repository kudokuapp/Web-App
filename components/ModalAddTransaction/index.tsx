import TextInput from '$components/InputPlaceholder/TextInput';
import { useMutation } from '@apollo/client';
import { mutationAddCashTransaction } from 'app/kudoku/mutation';
import { useSearchParams } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './index.module.css';

export const ModalAddTransaction = ({
  setIsAddTransaction,
}: {
  setIsAddTransaction: any;
}) => {
  const searchParamsName = useSearchParams().get('cashAccount') as string;
  const searchParamsID = useSearchParams().get('id') as string;
  const [type, setType] = useState('EXPENSE');
  const [transactionName, setTransactionName] = useState('');
  const [direction, setDirection] = useState('OUT');
  const [nominal, setNominal] = useState('');
  const [showCategory, setShowCategory] = useState(true);
  const [notes, setNotes] = useState(['']);
  const [addCashTransaction] = useMutation(mutationAddCashTransaction, {
    variables: {
      amount: nominal,
      cashAccountId: searchParamsID,
      currency: 'IDR',
      transactionType: type,
      direction: direction,
      isHideFromBudget: false,
      isHideFromInsight: false,
      merchantId: '63d3be20009767d5eb7e74e9',
      tags: notes,
      category: [{ amount: nominal, name: transactionName }],
    },
  });

  const dataCategory = [
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
  ];

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const addTransactionCash = () => {
      return new Promise((resolve, reject) => {
        addCashTransaction()
          .then((res: any) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    toast
      .promise(addTransactionCash(), {
        loading: 'Loading...',
        success: 'Transaksi berhasil ditambahkan!',
        error: 'Transaksi gagal ditambahkan!',
      })
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <>
      <div className={styles.modalContainer}>
        <div
          className={`${styles.modalBody} bg-onPrimary relative dark:bg-onSurfaceVariant text-black dark:text-surface`}
        >
          <Toaster
            position="top-right"
            containerStyle={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
          <div className="flex px-4 flex-row justify-between items-center mb-4">
            <div className="flex flex-row gap-4">
              <h4 className="text-xl text-primary dark:text-primaryDark font-bold">
                Add Transaction
              </h4>
            </div>
            <button onClick={() => setIsAddTransaction((c: any) => !c)}>
              x
            </button>
          </div>
          <hr className="border-b-2" />
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-start gap-4 w-full">
                <div className="flex flex-col justify-start">
                  <h4 className="text-outline dark:text-surfaceVariant text-sm">
                    Account
                  </h4>
                  <input
                    className="bg-background flex w-3/4 dark:bg-outline px-2 py-1 text-sm rounded"
                    type="text"
                    value={searchParamsName}
                    disabled
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <h4 className="text-outline dark:text-surfaceVariant text-sm">
                    Transaction Type
                  </h4>
                  <select
                    onChange={(e) => {
                      console.log(e.target.value);
                      setType(e.target.value);
                      if (e.target.value === 'EXPENSE') {
                        setDirection('OUT');
                        setShowCategory(true);
                      }
                      if (e.target.value === 'INCOME') {
                        setDirection('IN');
                        setShowCategory(false);
                      }
                    }}
                    value={type}
                    className="bg-background dark:bg-outline px-2 py-1 text-sm rounded"
                  >
                    <option className="px-2 py-1" value="EXPENSE">
                      Expense
                    </option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                  <div className="w-3/4 h-fit">
                    <TextInput
                      placeholder="Transaction name"
                      id="transactionName"
                      onChange={(e) => {
                        setTransactionName(e.target.value);
                      }}
                      value={transactionName}
                    />
                  </div>
                  <div className="w-1/4 h-fit">
                    <TextInput
                      placeholder="Nominal"
                      onChange={(e) => {
                        setNominal(e.target.value);
                      }}
                      value={nominal}
                      id="nominal"
                    />
                  </div>
                </div>
                {showCategory ? (
                  <div className="flex flex-col w-fit justify-start mt-2">
                    <h4 className="text-outline dark:text-surfaceVariant text-sm">
                      Category
                    </h4>
                    <select className="bg-background dark:bg-outline px-2 py-1 text-sm rounded">
                      {dataCategory.map((item) => (
                        <option className="px-2 py-1" value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <></>
                )}
                {/* <div className="flex flex-col w-full mb-2 justify-start">
                    <TextInput placeholder="Add Merchant" id="merchant" />
                    </div> */}
                <hr />
                <div className="flex flex-col justify-between gap-2 mt-2">
                  <h4 className="text-outline text-sm">Notes</h4>
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={2}
                    value={notes}
                    onChange={(e) => {
                      setNotes([e.target.value]);
                    }}
                    className="bg-neutralBackground dark:text-primaryContainerDark rounded-sm p-2"
                  />
                </div>
                <button className="w-full bg-primary hover:bg-secondary dark:bg-primaryDark dark:hover:bg-secondaryDark dark:text-primaryContainerDark text-white py-2 rounded-md my-2">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
