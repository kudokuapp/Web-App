'use client';
import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery } from '@apollo/client';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { queryAllDebitTransaction } from '../../query';
import TransactionDetailsDebit from './transaction-detail';

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

export default function TransactionListDebit({
  accountDebitItems,
}: {
  accountDebitItems: any;
}) {
  const token = getCookie('token') as string;
  const userId = getCookie('user_id') as string;
  const searchParamsName = useSearchParams().get('cashAccount');
  const searchParamsID = useSearchParams().get('id');
  const [isSingleData, setIsSingleData] = useState(false);
  const [isTransactionEmpty, setIsTransactionEmpty] = useState(false);
  const [transaction, setTransaction] = useState<any[]>([]);
  const [transactionGroup, setTransactionGroup] = useState<any[]>([]);
  const [transactionDetail, setTransactionDetail] = useState<MyObject>({
    id: '',
    debitAccountId: '',
    dateTimestamp: '',
    currency: '',
    amount: '',
    description: '',
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
  const [hideBalance, setIsHiddeBalance] = useState(true);
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
  const [allDebitTransaction, { client }] = useLazyQuery(
    queryAllDebitTransaction,
    { variables: { debitAccountId: searchParamsID } }
  );
  client.setLink(authLinkToken(token).concat(httpLink));
  const getAllDebitTransaction = () => {
    setTransaction([]);
    setTransactionGroup([]);
    return new Promise((resolve, reject) => {
      allDebitTransaction()
        .then((res: any) => {
          let length = res.data.getAllDebitTransaction.length;
          let data = res.data.getAllDebitTransaction;
          console.log(data);
          let result = [];
          if (length < 2 && length > 0) {
            setIsTransactionEmpty(false);
            setIsSingleData(true);
            setTransactionGroup(data);
            setTransactionDetail({
              ...transactionDetail,
              id: data[0].id,
              debitAccountId: data[0].debitAccountId,
              dateTimestamp: data[0].dateTimestamp,
              currency: data[0].currency,
              amount: data[0].amount,
              description: data[0].description,
              category: [
                {
                  name: data[0].description,
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
              merchant: data[0].merchant
                ? {
                    id: data[0].merchant.id,
                    name: data[0].merchant.name,
                    picture: data[0].merchant.picture,
                    url: data[0].merchant.url,
                  }
                : { id: '', name: '', picture: '', url: '' },
            });
            setTransaction(data);
          } else if (length > 1) {
            setIsTransactionEmpty(false);
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
              debitAccountId: data[0].debitAccountId,
              dateTimestamp: data[0].dateTimestamp,
              currency: data[0].currency,
              amount: data[0].amount,
              description: data[0].description,
              category: [
                {
                  name: data[0].description,
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
              merchant: data[0].merchant
                ? {
                    id: data[0].merchant.id,
                    name: data[0].merchant.name,
                    picture: data[0].merchant.picture,
                    url: data[0].merchant.url,
                  }
                : { id: '', name: '', picture: '', url: '' },
            });
            setTransaction(data);
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
    getAllDebitTransaction();
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
            </header>
            <div className="overflow-auto gap-4 flex flex-col">
              <h4 className="text-center">Current Balance :</h4>
              {hideBalance ? (
                <>
                  <div className="flex flex-row items-center gap-4 w-full self-center justify-center">
                    <h3 className="text-xl font-bold text-center text-secondary dark:text-secondaryDark">
                      Rp *********
                    </h3>
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => setIsHiddeBalance(false)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row items-center gap-4 w-full self-center justify-center">
                    <h3 className="text-xl font-bold text-center text-secondary dark:text-secondaryDark">
                      {rupiah(accountDebitItems)}
                    </h3>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => setIsHiddeBalance(true)}
                    />
                  </div>
                </>
              )}
              {transactionGroup.map((item: any) => (
                <div className="flex flex-col py-4">
                  <div className="flex flex-row justify-between p-4 bg-onPrimary dark:bg-onBackground text-black dark:text-surfaceVariant border-y-2 border-black dark:border-surfaceVariant align-middle items-center">
                    <h2>
                      {formatDate(
                        new Date(item.dateTimestamp).toISOString().split('T')[0]
                      )}
                    </h2>
                    {/* <div className="flex flex-row gap-4 items-center align-middle">
                      <button
                        className="text-sm h-5 w-4"
                        onClick={() => setIsHidden((c) => !c)}
                      >
                        <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                      </button>
                    </div> */}
                  </div>
                  <table className="table-auto mt-4">
                    <tbody>
                      {item.category.map((categories: any) => (
                        <tr
                          className="flex justify-between w-full gap-x-4 px-4 py-1 hover:bg-background text-sm cursor-pointer hover:text-onSurfaceVariant"
                          onClick={() => setTransactionDetail(item)}
                        >
                          <td className="w-1/2">{item.description}</td>
                          <td>{searchParamsName}</td>
                          <td>{item.transactionType}</td>
                          <td
                            className={
                              item.direction === 'IN'
                                ? `text-secondary dark:text-secondaryDark`
                                : `text-error dark:text-errorDark`
                            }
                          >
                            {rupiah(categories.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
          <TransactionDetailsDebit transactionDetail={transactionDetail} />
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
            </header>
            <div className="overflow-auto gap-4 flex flex-col">
              <h4 className="text-center">Current Balance :</h4>
              {hideBalance ? (
                <>
                  <div className="flex flex-row items-center gap-4 w-full self-center justify-center">
                    <h3 className="text-xl font-bold text-center text-secondary dark:text-secondaryDark">
                      Rp *********
                    </h3>
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => setIsHiddeBalance(false)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-row items-center gap-4 w-full self-center justify-center">
                    <h3 className="text-xl font-bold text-center text-secondary dark:text-secondaryDark">
                      {rupiah(accountDebitItems)}
                    </h3>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => setIsHiddeBalance(true)}
                    />
                  </div>
                </>
              )}
              {transactionGroup.map((item: any) => (
                <div className="flex flex-col py-4">
                  <div className="flex flex-row justify-between p-4 bg-onPrimary dark:bg-onBackground text-black dark:text-surfaceVariant border-y-2 border-black dark:border-surfaceVariant align-middle items-center">
                    <h2>{item.date}</h2>
                    {/* <div className="flex flex-row gap-4 items-center align-middle">
                      <button
                        className="text-sm h-5 w-4"
                        onClick={() => setIsHidden((c) => !c)}
                      >
                        <FontAwesomeIcon icon={faSquareCaretDown} size="lg" />
                      </button>
                    </div> */}
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
                            className="flex justify-between w-full gap-x-4 px-4 py-1 cursor-pointer hover:bg-background text-sm hover:text-onSurfaceVariant"
                            key={value}
                            onClick={() => setTransactionDetail(value)}
                          >
                            {value.category !== null ? (
                              value.category.map((categories: any) => (
                                <>
                                  <td className="w-1/2">{value.description}</td>
                                  <td>{searchParamsName}</td>
                                  <td>{value.transactionType}</td>
                                  <td
                                    className={
                                      value.direction === 'IN'
                                        ? `text-secondary dark:text-secondaryDark`
                                        : `text-error dark:text-errorDark`
                                    }
                                  >
                                    {rupiah(categories.amount)}
                                  </td>
                                </>
                              ))
                            ) : (
                              <>
                                <>
                                  <td className="w-1/2">{value.description}</td>
                                  <td>{searchParamsName}</td>
                                  <td>{value.transactionType}</td>
                                  <td
                                    className={
                                      value.direction === 'IN'
                                        ? `text-secondary dark:text-secondaryDark`
                                        : `text-error dark:text-errorDark`
                                    }
                                  >
                                    {rupiah(value.amount)}
                                  </td>
                                </>
                              </>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
          <TransactionDetailsDebit transactionDetail={transactionDetail} />
        </>
      )}
    </>
  );
}
