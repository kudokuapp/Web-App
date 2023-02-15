'use client';
import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';
import { faListDots, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mutationDisconnectDebit } from 'app/kudoku/mutation';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { queryAllDebitAccount } from '../../query';

export default function Page() {
  const token = getCookie('token') as string;
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [addAcount, setIsAddAccount] = useState(false);
  const [isMoreActive, setIsMoreActive] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [debitAccountId, setDebitAccountId] = useState('');
  const [accountDebitItems, setAccountDebitItems] = useState([
    { href: '', title: '', id: '' },
  ]);
  const searchParamsDebit = useSearchParams().get('debitAccount');

  const [debitAccount, { client }] = useLazyQuery(queryAllDebitAccount);
  client.setLink(authLinkToken(token).concat(httpLink));
  const getAllDebitAccount = () => {
    return new Promise((resolve, reject) => {
      debitAccount()
        .then((res: any) => {
          let length = res.data.getAllDebitAccount.length;
          let data = res.data.getAllDebitAccount;
          let tempArray = [];

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              tempArray.push({
                href: `/kudoku/transaction`,
                title: data[i].accountNumber,
                id: data[i].id,
              });
            }

            setAccountDebitItems(tempArray);
          } else if (length <= 0) {
            setIsEmpty(true);
          }

          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const [deleteDebitAccount] = useMutation(mutationDisconnectDebit, {
    variables: { debitAccountId: debitAccountId },
  });

  useEffect(() => {
    getAllDebitAccount();
  }, []);

  return (
    <>
      {isDeleteAccount ? (
        <Toaster
          position="bottom-right"
          containerStyle={{
            position: 'absolute',
            right: 0,
            top: 100,
          }}
        />
      ) : (
        <></>
      )}
      {accountDebitItems.map(({ href, title, id }) =>
        title !== '' ? (
          <li
            className={
              searchParamsDebit === title
                ? 'active my-2 bg-background dark:text-black rounded'
                : 'my-2 hover:bg-background rounded text-black dark:text-surfaceVariant hover:dark:text-black'
            }
            key={title}
          >
            <Link
              shallow={true}
              href={{
                pathname: href,
                query: {
                  debitAccount: title,
                  id: id,
                },
              }}
              className="flex p-2 flex-row relative align-middle justify-between items-center"
            >
              <div className="flex gap-1 align-middle items-center">
                <span className="text-primary font-bold">BCA</span>
                <div className={`flex rounded cursor-pointer`}>{title}</div>
              </div>
              {searchParamsDebit === title ? (
                <>
                  <button onClick={() => setIsMoreActive((c) => !c)}>
                    <FontAwesomeIcon className="" icon={faListDots} size="sm" />
                  </button>
                  {isMoreActive ? (
                    <div className="absolute bg-onPrimary p-4 flex flex-col h-fit right-0 top-full items-end rounded z-10 gap-2">
                      <button
                        onClick={async () => {
                          await setDebitAccountId(id);
                          setIsDeleteAccount(true);
                          const deleteTransactionCash = () => {
                            return new Promise((resolve, reject) => {
                              deleteDebitAccount()
                                .then((res: any) => {
                                  resolve(res);
                                })
                                .catch((error) => {
                                  reject(error);
                                });
                            });
                          };
                          toast
                            .promise(deleteDebitAccount(), {
                              loading: 'Loading...',
                              success: 'Akun berhasil dihapus!',
                              error: 'Akun gagal dihapus!',
                            })
                            .then(() => {
                              router.push('/kudoku/transaction');
                            });
                        }}
                        className="text-sm gap-2 flex items-center text-error"
                      >
                        <FontAwesomeIcon
                          className=""
                          icon={faTrash}
                          size="sm"
                        />
                        Disconnect account
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </Link>
          </li>
        ) : (
          <></>
        )
      )}
    </>
  );
}
