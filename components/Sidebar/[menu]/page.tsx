'use client';
/* eslint-disable @next/next/no-head-element */
import DarkModeToggle from '$components/Switch/DarkModeToggle';
import Logo from '$public/logo/secondary.svg';
import '$styles/globals.css';
import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  faExclamation,
  faListDots,
  faMoneyBill1Wave,
  faSignOut,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie, removeCookies } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { mutationDeleteCashAccount } from '../../../app/[kudoku]/mutation';
import { queryAllCashAccount, queryProfile } from '../../../app/[kudoku]/query';
import GetAllDebitAccount from '../../../app/[kudoku]/[transaction]/[debit]/page';

export default function Page({ setIsAddAccount }: { setIsAddAccount: any }) {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [isHideBtn, setIsHideBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [reconcile, setIsReconcile] = useState(false);
  const [isMoreActive, setIsMoreActive] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [profileUser, setProfileUser] = useState({ username: '', kudosNo: '' });
  const [accountItems, setAccountItems] = useState([
    { href: '', title: '', id: '' },
  ]);
  const [accountDebitItems, setAccountDebitItems] = useState([
    { href: '', title: '', id: '' },
  ]);
  const searchParamsCash = useSearchParams().get('cashAccount');

  const token = getCookie('token') as string;
  const userId = getCookie('user_id') as string;

  if (!token) router.push('/login');

  const [cashAccount, { client }] = useLazyQuery(queryAllCashAccount);
  client.setLink(authLinkToken(token).concat(httpLink));

  const [profile] = useLazyQuery(queryProfile, {
    variables: { userId: userId },
  });

  const menuItems = [
    {
      title: '+ Add financial account',
    },
  ];

  const [deleteCashAccount] = useMutation(mutationDeleteCashAccount, {
    variables: { cashAccountId: accountId },
  });

  const getAllCashAccount = () => {
    return new Promise((resolve, reject) => {
      cashAccount()
        .then((res: any) => {
          let length = res.data.getAllCashAccount.length;
          let data = res.data.getAllCashAccount;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              setAccountItems((oldValue) => [
                ...oldValue,
                {
                  href: `/kudoku/transaction`,
                  title: data[i].accountName,
                  id: data[i].id,
                },
              ]);
            }
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

  const getProfile = () => {
    return new Promise((resolve, reject) => {
      profile()
        .then((res: any) => {
          setProfileUser({
            username: res.data.getProfile.user.username,
            kudosNo: res.data.getProfile.user.kudosNo,
          });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  function logout() {
    removeCookies('token');
    router.push('/login');
  }

  useEffect(() => {
    getProfile();
    if (window.innerWidth <= 640) {
      setIsHidden(false);
      setIsHideBtn(false);
    }
    if (window.innerWidth > 640) {
      setIsHidden(true);
      setIsHideBtn(false);
    }
  }, []);

  useLayoutEffect(() => {
    getAllCashAccount();
  }, []);

  return (
    <>
      {isHidden ? (
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform border-r-2 border-outline"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-onPrimary dark:bg-onBackground dark:text-surfaceVariant flex flex-col justify-between">
            <div>
              {isHideBtn ? (
                <div
                  className="self-end flex w-full justify-end"
                  onClick={() => setIsHidden((c) => !c)}
                >
                  <button>X</button>
                </div>
              ) : (
                <></>
              )}
              <div className="mb-4 flex flex-row justify-between items-center">
                <div>
                  <h4>{profileUser.username}</h4>
                  <h4>Kudos No.{profileUser.kudosNo}</h4>
                </div>

                <DarkModeToggle />
              </div>
              {menuItems.map(({ title }) => (
                <button
                  onClick={() => setIsAddAccount((c: any) => !c)}
                  key={title}
                  className={`flex p-2 w-full bg-primary dark:bg-primaryDark rounded text-onPrimary dark:text-onPrimaryDark cursor-pointer`}
                >
                  {title}
                </button>
              ))}
              {/* <div className="bg-neutralBackground rounded-sm flex flex-row align-middle m-2 p-2 gap-2 items-center justify-between">
                <FontAwesomeIcon icon={faLightbulb} size="sm" />
                <p className="text-sm">
                  Refresh transaction to update transactions from your connected
                  accounts.
                </p>
              </div> */}

              <ul className="mt-8 relative">
                <h4>My Account</h4>
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
                {accountItems
                  .slice(0, (accountItems.length + 1) / 2)
                  .map(({ href, title, id }) =>
                    title !== '' ? (
                      <li
                        className={
                          searchParamsCash ===
                          title.replace(/\s+/g, '-').toLowerCase()
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
                              cashAccount: title
                                .replace(/\s+/g, '-')
                                .toLowerCase(),
                              id: id,
                            },
                          }}
                          className="flex p-2 flex-row relative align-middle justify-between items-center"
                        >
                          <div className="flex gap-1 align-middle items-center">
                            <FontAwesomeIcon
                              icon={faMoneyBill1Wave}
                              size="sm"
                            />
                            <div className={`flex rounded cursor-pointer`}>
                              {title}
                            </div>
                          </div>
                          {searchParamsCash ===
                          title.replace(/\s+/g, '-').toLowerCase() ? (
                            <>
                              <button
                                onClick={() => setIsMoreActive((c) => !c)}
                              >
                                <FontAwesomeIcon
                                  className=""
                                  icon={faListDots}
                                  size="sm"
                                />
                              </button>
                              {isMoreActive ? (
                                <div className="absolute bg-onPrimary shadow-md dark:bg-onPrimary p-4 flex flex-col h-fit right-0 top-full items-end rounded z-10 gap-2">
                                  <button
                                    onClick={() => setIsReconcile((c) => !c)}
                                    className="text-sm gap-2 flex items-center"
                                  >
                                    <FontAwesomeIcon
                                      className=""
                                      icon={faExclamation}
                                      size="sm"
                                    />
                                    Reconcile balance
                                  </button>
                                  <button
                                    onClick={async () => {
                                      await setAccountId(id);
                                      setIsDeleteAccount(true);
                                      const deleteTransactionCash = () => {
                                        return new Promise(
                                          (resolve, reject) => {
                                            deleteCashAccount()
                                              .then((res: any) => {
                                                resolve(res);
                                              })
                                              .catch((error) => {
                                                reject(error);
                                              });
                                          }
                                        );
                                      };
                                      toast
                                        .promise(deleteCashAccount(), {
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
                                    Delete account
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
                <GetAllDebitAccount />
              </ul>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <button
                onClick={() => logout()}
                className="text-error dark:text-errorDark bg-errorContainer dark:bg-errorContainerDark p-2 w-full gap-x-2 flex items-center text-start"
              >
                <FontAwesomeIcon icon={faSignOut} size="sm" />
                Log out
              </button>
              <Image
                height={30}
                src={Logo}
                quality={100}
                alt="Kudoku Logo"
                draggable={false}
              />
              <p>Version 0.0.1</p>
            </div>
          </div>
        </aside>
      ) : (
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          onClick={() => setIsHidden((c) => !c)}
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      )}
    </>
  );
}
