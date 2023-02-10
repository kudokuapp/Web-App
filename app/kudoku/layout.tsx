'use client';
/* eslint-disable @next/next/no-head-element */
import Logo from '$public/logo/secondary.svg';
import EmptyData from '$public/splash_screens/emptyData.svg';
import '$styles/globals.css';
import { authLinkToken, httpLink } from '$utils/graphql';
import { useLazyQuery } from '@apollo/client';
import { faMoneyBill1Wave, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie, removeCookies } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { queryAllCashAccount, queryProfile } from './query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [username, setUserame] = useState({ username: '', kudosNo: '' });
  const [accountItems, setAccountItems] = useState([{ href: '', title: '' }]);
  const boxRef = useRef(null);

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
      href: '/',
      title: '+ Add financial account',
    },
  ];

  const getAllCashAccount = () => {
    return new Promise((resolve, reject) => {
      cashAccount()
        .then((res: any) => {
          let length = res.data.getAllCashAccount.length;
          let data = res.data.getAllCashAccount;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              setAccountItems([{ href: '#', title: data[i].accountName }]);
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
          console.log(res);
          setUserame({
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
    getAllCashAccount();
    getProfile();
    if (window.innerWidth <= 640) {
      setIsHidden(false);
    }
    if (window.innerWidth > 640) {
      setIsHidden(true);
    }
  }, []);
  const boxOutsideClick = OutsideClick(boxRef);
  function OutsideClick(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (window.innerWidth <= 640) {
          if (ref.current && !ref.current.contains(event.target)) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
    return isHidden;
  }
  return (
    <>
      {isHidden ? (
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform border-r-2 border-outline"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-onPrimary flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h4>{username.username}</h4>
                <h4>Kudos No.{username.kudosNo}</h4>
              </div>
              <ul>
                {menuItems.map(({ href, title }) => (
                  <li key={title}>
                    <Link href={href}>
                      <div
                        className={`flex p-2 bg-primary rounded text-white cursor-pointer`}
                      >
                        {title}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* <div className="bg-neutralBackground rounded-sm flex flex-row align-middle m-2 p-2 gap-2 items-center justify-between">
                <FontAwesomeIcon icon={faLightbulb} size="sm" />
                <p className="text-sm">
                  Refresh transaction to update transactions from your connected
                  accounts.
                </p>
              </div> */}

              <ul className="mt-8">
                <h4 className="p-2">My Account</h4>
                {accountItems.length > 0 ? (
                  accountItems.map(({ href, title }) => (
                    <li className="m-2 hover:bg-background rounded" key={title}>
                      <Link
                        href={href}
                        className="flex p-2 flex-row align-middle items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faMoneyBill1Wave} size="sm" />
                        <div
                          className={`flex rounded text-black cursor-pointer`}
                        >
                          {title}
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <button
                onClick={() => logout()}
                className="text-error bg-errorContainer p-2 w-full gap-x-2 flex items-center text-start"
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
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      )}
      <div className="sm:ml-64">
        {isEmpty ? (
          <>
            <div className="flex flex-col items-center align-middle justify-center h-screen">
              <Image
                height={400}
                src={EmptyData}
                quality={100}
                alt="Kudoku Logo"
                draggable={false}
              />
              <h4>
                No tracked transactions available. It seems like you haven’t
                connect or create financial account.
              </h4>
              <h4 className="my-4">
                {' '}
                Click <strong>+ add financial account</strong> to get started!
              </h4>
            </div>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </>
  );
}
