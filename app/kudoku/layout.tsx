'use client';
/* eslint-disable @next/next/no-head-element */
import '$styles/globals.css';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const boxRef = useRef(null);

  const menuItems = [
    {
      href: '/',
      title: '+ Add financial account',
    },
    {
      href: '/about',
      title: 'Refresh transaction',
    },
  ];

  useEffect(() => {
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
          <div className="h-full px-3 py-4 overflow-y-auto bg-onPrimary">
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className="m-2" key={title}>
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
            <div className="bg-neutralBackground rounded-sm flex flex-row align-middle m-2 p-2 gap-2 items-center justify-between">
              <FontAwesomeIcon icon={faLightbulb} size="sm" />
              <p className="text-sm">
                Refresh transaction to update transactions from your connected
                accounts.
              </p>
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
      <div className="sm:ml-64">{children}</div>
    </>
  );
}
