'use client';
import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery } from '@apollo/client';
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { queryAllCashTransaction } from '../query';
import TransactionDetails from './transaction-detail';

type MyObject = {
  id: string;
  cashAccountId: string;
  dateTimestamp: string;
  currency: string;
  amount: string;
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

export default function TransactionList({
  setIsAddTransaction,
  setIsTransactionEmpty,
}: {
  setIsAddTransaction: any;
  setIsTransactionEmpty: any;
}) {
  const token = getCookie('token') as string;
  const userId = getCookie('user_id') as string;
  const searchParamsName = useSearchParams().get('cashAccount');
  const searchParamsID = useSearchParams().get('id');
  const [isSingleData, setIsSingleData] = useState(false);
  const [transaction, setTransaction] = useState<any[]>([]);
  const [transactionGroup, setTransactionGroup] = useState<any[]>([]);
  const [transactionDetail, setTransactionDetail] = useState<MyObject>({
    id: '',
    cashAccountId: '',
    dateTimestamp: '',
    currency: '',
    amount: '',
    merchantId: '',
    category: [{ name: '', amount: '' }],
    transactionType: '',
    internalTransferAccountId: null,
    direction: '',
    notes: '',
    location: null,
    tags: [],
    isHideFromBudget: false,
    isHideFromInsight: false,
    merchant: { id: '', name: '', picture: '', url: '' },
  });
  const [isHidden, setIsHidden] = useState(true);
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
  const [allCashTransaction, { client }] = useLazyQuery(
    queryAllCashTransaction,
    { variables: { cashAccountId: searchParamsID } }
  );
  client.setLink(authLinkToken(token).concat(httpLink));
  const getAllCashTransaction = () => {
    setTransaction([]);
    setTransactionGroup([]);
    return new Promise((resolve, reject) => {
      allCashTransaction()
        .then((res: any) => {
          let length = res.data.getAllCashTransaction.length;
          let data = res.data.getAllCashTransaction;
          console.log(data);
          let result = [];
          if (length < 2 && length > 0) {
            setIsSingleData(true);
            setTransactionGroup(data);
            setTransactionDetail({
              ...transactionDetail,
              id: data[0].id,
              cashAccountId: data[0].cashAccountId,
              dateTimestamp: data[0].dateTimestamp,
              currency: data[0].currency,
              amount: data[0].amount,
              merchantId: data[0].merchantId,
              category: [
                {
                  name: data[0].category[0].name,
                  amount: data[0].category[0].amount,
                },
              ],
              transactionType: data[0].transactionType,
              internalTransferAccountId: null,
              direction: data[0].direction,
              notes: data[0].notes,
              location: null,
              tags: data[0].tags,
              isHideFromBudget: false,
              isHideFromInsight: false,
              merchant: {
                id: data[0].merchant.id,
                name: data[0].merchant.name,
                picture: data[0].merchant.picture,
                url: data[0].merchant.url,
              },
            });
            setTransaction(data);
            setIsTransactionEmpty(false);
          } else if (length > 1) {
            setIsSingleData(false);
            const groups = data.reduce((groups: any, game: any) => {
              const date = formatDate(
                new Date(game.dateTimestamp).toISOString().split('T')[0]
              );
              if (!groups[date]) {
                groups[date] = [];
              }
              groups[date].push(game);
              return groups;
            }, {});

            // Edit: to add it in the array format instead
            const groupArrays = Object.keys(groups).map((date) => {
              return {
                date,
                data: groups[date],
              };
            });
            setTransactionGroup(groupArrays);
            setTransactionDetail({
              ...transactionDetail,
              id: data[0].id,
              cashAccountId: data[0].cashAccountId,
              dateTimestamp: data[0].dateTimestamp,
              currency: data[0].currency,
              amount: data[0].amount,
              merchantId: data[0].merchantId,
              category: [
                {
                  name: data[0].category[0].name,
                  amount: data[0].category[0].amount,
                },
              ],
              transactionType: data[0].transactionType,
              internalTransferAccountId: null,
              direction: data[0].direction,
              notes: data[0].notes,
              location: null,
              tags: data[0].tags,
              isHideFromBudget: false,
              isHideFromInsight: false,
              merchant: {
                id: data[0].merchant.id,
                name: data[0].merchant.name,
                picture: data[0].merchant.picture,
                url: data[0].merchant.url,
              },
            });
            setTransaction(data);
            setIsTransactionEmpty(false);
          } else if (length <= 0) {
            setIsTransactionEmpty(true);
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const [className, setIsClassName] = useState(
    'flex flex-col w-7/12 gap-4 border-r-2 border-outline'
  );
  useEffect(() => {
    getAllCashTransaction();
    if (window.innerWidth <= 640) {
      setIsClassName('flex flex-col w-screen gap-4 border-r-2 border-outline');
    }
    if (window.innerWidth > 640) {
      setIsClassName('flex flex-col w-7/12 gap-4 border-r-2 border-outline');
    }
  }, [searchParamsID]);
  return (
    <>
      {isSingleData ? (
        <>
          <div className={className}>
            <header className="bg-onPrimary dark:bg-onBackground p-4 border-b-2 border-outline flex justify-between align-middle items-center">
              <h2 className="text-primary dark:text-primaryDark font-bold text-xl">
                {searchParamsName
                  ?.toString()
                  .replace(/-/g, ' ')
                  .split(' ')
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(' ')}{' '}
                Transactions
              </h2>
              <button
                onClick={() => setIsAddTransaction((c: any) => !c)}
                className="border-2 border-outline py-1 px-2 rounded-md"
              >
                + Add Transaction
              </button>
            </header>
            <div className="overflow-auto gap-4 flex flex-col">
              {transactionGroup.map((item: any) => (
                <div className="flex flex-col py-4">
                  <div className="flex flex-row justify-between p-4 bg-onPrimary dark:bg-onBackground text-black dark:text-surfaceVariant border-y-2 border-black dark:border-surfaceVariant align-middle items-center">
                    <h2>
                      {formatDate(
                        new Date(item.dateTimestamp).toISOString().split('T')[0]
                      )}
                    </h2>
                    <div className="flex flex-row gap-4 items-center align-middle">
                      <h4>-{item.amount}</h4>
                      <button
                        className="text-sm h-5 w-4"
                        onClick={() => setIsHidden((c) => !c)}
                      >
                        <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                      </button>
                    </div>
                  </div>
                  <table className="table-auto mt-4">
                    <tbody>
                      {item.category.map((categories: any) => (
                        <tr
                          className="flex justify-between w-full gap-x-4 px-4 py-1"
                          onClick={() => setTransactionDetail(item)}
                        >
                          <td>{categories.name}</td>
                          <td>{searchParamsName}</td>
                          <td>{categories.name}</td>
                          <td>{categories.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col w-2/3 items-center self-center border-2 rounded-md border-primary mt-4 p-4">
                    <h4>Overview</h4>
                    <h4 className="text-black dark:text-surfaceVariant font-bold">
                      Maret 2022
                    </h4>
                    <div className="flex justify-between flex-row w-full p-4">
                      <div className="flex flex-col items-center">
                        <h3 className="text-secondary dark:text-secondaryDark font-bold text-xl">
                          Rp.20.000.000
                        </h3>
                        <h3 className="text-outline font-bold">Total Income</h3>
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="text-black dark:text-surfaceVariant font-bold text-xl">
                          Rp.
                          {transaction
                            .filter((item: any) => item.direction === 'OUT')
                            .reduce(
                              (acc: any, o: any) => acc + parseInt(o.amount),
                              0
                            )}
                        </h3>
                        <h3 className="text-outline font-bold">Total Spend</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TransactionDetails transactionDetail={transactionDetail} />
        </>
      ) : (
        <>
          <div className={className}>
            <header className="bg-onPrimary dark:bg-onBackground p-4 border-b-2 border-outline flex justify-between align-middle items-center">
              <h2 className="text-primary dark:text-primaryDark font-bold text-xl">
                {searchParamsName
                  ?.toString()
                  .replace(/-/g, ' ')
                  .split(' ')
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(' ')}{' '}
                Transactions
              </h2>
              <button
                onClick={() => setIsAddTransaction((c: any) => !c)}
                className="border-2 border-outline py-1 px-2 rounded-md"
              >
                + Add Transaction
              </button>
            </header>
            <div className="overflow-auto gap-4 flex flex-col">
              {transactionGroup.map((item: any) => (
                <div className="flex flex-col py-4">
                  <div className="flex flex-row justify-between p-4 bg-onPrimary dark:bg-onBackground text-black dark:text-surfaceVariant border-y-2 border-black dark:border-surfaceVariant align-middle items-center">
                    <h2>{item.date}</h2>
                    <div className="flex flex-row gap-4 items-center align-middle">
                      <h4>
                        -
                        {/* {transaction
        .filter(
          (data: any) =>
            formatDate(
              new Date(data.dateTimestamp)
                .toISOString()
                .split('T')[0]
            ) === item.date
        )
        .reduce((acc, o) => {
          let result =
            parseInt(acc.amount) + parseInt(o.amount);
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(result);
        })} */}
                      </h4>
                      <button
                        className="text-sm h-5 w-4"
                        onClick={() => setIsHidden((c) => !c)}
                      >
                        <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                      </button>
                    </div>
                  </div>
                  <table className="table-auto mt-4">
                    <tbody>
                      {transaction
                        .filter(
                          (data: any) =>
                            formatDate(
                              new Date(data.dateTimestamp)
                                .toISOString()
                                .split('T')[0]
                            ) === item.date
                        )
                        .map((value: any) => (
                          <tr
                            className="flex justify-between w-full gap-x-4 px-4 py-1 cursor-pointer"
                            key={value}
                            onClick={() => setTransactionDetail(value)}
                          >
                            {value.category.map((categories: any) => (
                              <>
                                <td>{categories.name}</td>
                                <td>{searchParamsName}</td>
                                <td>{categories.name}</td>
                                <td>{categories.amount}</td>
                              </>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col w-2/3 items-center self-center border-2 rounded-md border-primary mt-4 p-4">
                    <h4>Overview</h4>
                    <h4 className="text-black dark:text-surfaceVariant font-bold">
                      Maret 2022
                    </h4>
                    <div className="flex justify-between flex-row w-full p-4">
                      <div className="flex flex-col items-center">
                        <h3 className="text-secondary dark:text-secondaryDark font-bold text-xl">
                          Rp.20.000.000
                        </h3>
                        <h3 className="text-outline font-bold">Total Income</h3>
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="text-black dark:text-surfaceVariant font-bold text-xl">
                          Rp.
                          {transaction
                            .filter((item: any) => item.direction === 'OUT')
                            .reduce(
                              (acc: any, o: any) => acc + parseInt(o.amount),
                              0
                            )}
                        </h3>
                        <h3 className="text-outline font-bold">Total Spend</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TransactionDetails transactionDetail={transactionDetail} />
        </>
      )}
    </>
  );
}
