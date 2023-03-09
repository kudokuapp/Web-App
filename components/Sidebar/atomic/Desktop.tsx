import DarkModeToggle from '$components/Switch/DarkModeToggle';
import { SidebarContext } from '$context/SidebarContext';
import ThemeContext from '$context/ThemeContext';
import LogoShortLight from '$public/logo/primary.svg';
import LogoShortDark from '$public/logo/primaryDark.svg';
import LogoWideLight from '$public/logo/secondary.svg';
import LogoWideDark from '$public/logo/secondaryDark.svg';
import { censorWordFixedChar } from '$utils/helper/censor';
import renderImageFromInstitutionId from '$utils/helper/renderImageFromInstitutionId';
import {
  faArrowDown,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faMoneyBill1Wave,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import menuItem from './menuItem';

export interface IMyAccount {
  type: 'Cash' | 'Debit' | 'EWallet' | 'EMoney';
  institutionId: 'Cash' | ObjectId | string;
  accountNumber: string;
  balance: string;
}

export default function Desktop({
  kudosNo = 15,
  accounts,
}: {
  kudosNo: number;
  accounts: IMyAccount[] | null;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const router = useRouter();

  const isMacOrIPad = /(Mac|iPad)/i.test(navigator.userAgent);

  const version = process.env.VERSION;

  const controls = useAnimation();

  const groupedAccounts = _.groupBy(accounts, 'type');

  const renderLogo = () => {
    if (isSidebarOpen) {
      if (isDarkTheme) {
        return LogoWideDark;
      } else {
        return LogoWideLight;
      }
    } else {
      if (isDarkTheme) {
        return LogoShortDark;
      } else {
        return LogoShortLight;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && !isNaN(parseInt(event.key))) {
        const menuItemId = parseInt(event.key);
        const item = menuItem.find((item) => item.id === menuItemId);

        if (item && !item.disabled) {
          router.push(item.url);
          console.log(item.url);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.aside
      className="bg-[#E6E6E6] dark:bg-[#1a1b1f] flex flex-col justify-between fixed top-0 left-0 shadow-inner px-6 pt-14 pb-8 select-none h-[100vh]"
      animate={isSidebarOpen ? 'open' : 'closed'}
      variants={{ open: { width: 300 }, closed: { width: 100 } }}
    >
      <motion.section animate={{ opacity: 1 }} className="flex flex-col gap-12">
        <motion.section
          animate={{ opacity: 1 }}
          className="flex flex-wrap-reverse justify-between items-center align-middle"
        >
          <motion.div
            animate={controls}
            className={`flex items-center justify-center ${
              isSidebarOpen ? '' : 'w-full mt-4'
            }`}
          >
            <a href="/kudoku">
              <Image
                src={renderLogo()}
                height={30}
                alt="Logo Kudoku"
                layout="fixed"
                priority={true}
              />
            </a>
          </motion.div>

          <DarkModeToggle />
        </motion.section>

        <motion.section
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4"
        >
          {menuItem.map((value) => {
            return (
              <motion.button
                animate={{ opacity: 1 }}
                whileHover={{
                  scale:
                    value.regex.test(pathname as string) || value.disabled
                      ? 1
                      : 1.1,
                }}
                key={value.id}
                className={`w-full flex items-center rounded-md ${
                  isSidebarOpen
                    ? 'justify-between px-2 py-1.5'
                    : 'justify-center p-2'
                } ${
                  value.regex.test(pathname as string)
                    ? 'bg-primary dark:bg-primaryDark'
                    : 'hover:bg-primary dark:hover:bg-primaryDark hover:bg-opacity-20'
                } ${value.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => {
                  router.push(value.url);
                }}
                disabled={
                  value.regex.test(pathname as string) || value.disabled
                }
              >
                <p
                  className={`flex items-center justify-center gap-2 font-medium ${
                    value.regex.test(pathname as string)
                      ? 'text-onPrimary dark:text-onPrimaryDark'
                      : 'text-onPrimaryContainer dark:text-surfaceVariant'
                  } ${isSidebarOpen ? 'text-base' : 'text-xl'}`}
                >
                  <FontAwesomeIcon icon={value.icon} />
                  {isSidebarOpen ? value.name : ''}
                </p>
                {isSidebarOpen && (
                  <p className="dark:bg-gray-300 bg-gray-400 text-black text-xs px-1 py-0.5 w-fit h-fit rounded-md">
                    {isMacOrIPad ? '⌥' : 'alt'} {value.id}
                  </p>
                )}
              </motion.button>
            );
          })}
        </motion.section>
      </motion.section>

      {isSidebarOpen && (
        <div className="w-full h-fit flex flex-col items-start text-start">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-base text-onPrimaryContainer dark:text-surfaceVariant font-bold"
          >
            My accounts
            {!isExpanded && <FontAwesomeIcon icon={faArrowRight} size="sm" />}
            {isExpanded && <FontAwesomeIcon icon={faArrowDown} size="sm" />}
          </button>
          <AnimatePresence>
            {isExpanded && accounts !== null && (
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: 'auto',
                  maxHeight: 225,
                  marginTop: 4,
                  marginBottom: 4,
                  overflow: 'auto',
                }}
                exit={{ height: 0 }}
                className="w-full flex flex-col gap-4"
              >
                {groupedAccounts['Cash'] && groupedAccounts['Cash'].length > 0 && (
                  <section className="flex flex-col my-1 gap-2">
                    <p className="text-onPrimaryContainer dark:text-surfaceVariant font-bold">
                      Cash
                    </p>
                    {groupedAccounts['Cash'].map((value, index) => {
                      return (
                        <section
                          key={index}
                          className="flex justify-between items-center text-onPrimaryContainer dark:text-surfaceVariant w-full h-fit"
                        >
                          <div className="flex gap-2 items-center max-w-[125px] truncate">
                            <FontAwesomeIcon icon={faMoneyBill1Wave} />
                            {value.accountNumber}
                          </div>
                          <p>
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }).format(Number(value.balance))}
                          </p>
                        </section>
                      );
                    })}
                  </section>
                )}

                {groupedAccounts['Debit'] &&
                  groupedAccounts['Debit'].length > 0 && (
                    <section className="flex flex-col my-1 gap-2">
                      <p className="text-onPrimaryContainer dark:text-surfaceVariant font-bold">
                        Debit
                      </p>
                      {groupedAccounts['Debit'].map((value, index) => {
                        return (
                          <section
                            key={index}
                            className="flex justify-between items-center text-onPrimaryContainer dark:text-surfaceVariant w-full h-fit"
                          >
                            <div className="flex gap-2 items-center max-w-[125px] truncate">
                              {renderImageFromInstitutionId({
                                institutionId: value.institutionId as string,
                                height: 20,
                              })}
                              {censorWordFixedChar(value.accountNumber)}
                            </div>
                            <p>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }).format(Number(value.balance))}
                            </p>
                          </section>
                        );
                      })}
                    </section>
                  )}

                {groupedAccounts['EWallet'] &&
                  groupedAccounts['EWallet'].length > 0 && (
                    <section className="flex flex-col my-1 gap-2">
                      <p className="text-onPrimaryContainer dark:text-surfaceVariant font-bold">
                        E-Wallet
                      </p>
                      {groupedAccounts['EWallet'].map((value, index) => {
                        return (
                          <section
                            key={index}
                            className="flex justify-between items-center text-onPrimaryContainer dark:text-surfaceVariant w-full h-fit"
                          >
                            <div className="flex gap-2 items-center max-w-[125px] truncate">
                              {renderImageFromInstitutionId({
                                institutionId: value.institutionId as string,
                                height: 20,
                              })}
                              {censorWordFixedChar(value.accountNumber)}
                            </div>
                            <p>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }).format(Number(value.balance))}
                            </p>
                          </section>
                        );
                      })}
                    </section>
                  )}

                {groupedAccounts['EMoney'] &&
                  groupedAccounts['EMoney'].length > 0 && (
                    <section className="flex flex-col my-1 gap-2">
                      <p className="text-onPrimaryContainer dark:text-surfaceVariant font-bold">
                        E-Money
                      </p>
                      {groupedAccounts['EMoney'].map((value, index) => {
                        return (
                          <section
                            key={index}
                            className="flex justify-between items-center text-onPrimaryContainer dark:text-surfaceVariant w-full h-fit"
                          >
                            <div className="flex gap-2 items-center max-w-[125px] truncate">
                              {renderImageFromInstitutionId({
                                institutionId: value.institutionId as string,
                                height: 20,
                              })}
                              {censorWordFixedChar(value.accountNumber)}
                            </div>
                            <p>
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }).format(Number(value.balance))}
                            </p>
                          </section>
                        );
                      })}
                    </section>
                  )}
              </motion.div>
            )}

            {isExpanded && accounts === null && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <p className="text-onPrimaryContainer dark:text-surfaceVariant">
                  Belum ada akun
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <motion.section animate={{ opacity: 1 }} className="flex flex-col gap-8">
        <motion.button
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            controls
              .start({
                opacity: 0,
                transition: { duration: 0.25 },
              })
              .then(() => {
                controls.start({
                  opacity: 1,
                  transition: { duration: 0.25 },
                });
              });
          }}
          className={`text-onSecondary dark:text-onSecondaryDark bg-secondary dark:bg-secondaryDark px-2 py-1.5 w-full gap-2 flex items-center shadow-sm rounded-md text-start ${
            isSidebarOpen ? '' : 'justify-center'
          } text-sm`}
        >
          {isSidebarOpen ? (
            <FontAwesomeIcon icon={faChevronLeft} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
          {isSidebarOpen ? 'Sembunyikan' : ''}
        </motion.button>

        <motion.button
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            deleteCookie('token');
            deleteCookie('user_id');
            router.push('/login');
          }}
          className={`dark:text-error text-errorDark dark:bg-errorContainer bg-errorContainerDark px-2 py-1.5 w-full gap-2 flex items-center shadow-sm rounded-md text-start ${
            isSidebarOpen ? '' : 'justify-center'
          } text-sm`}
        >
          <FontAwesomeIcon icon={faSignOut} />
          {isSidebarOpen ? 'Keluar' : ''}
        </motion.button>

        <motion.section
          animate={{ opacity: 1 }}
          className={`text-xs flex flex-wrap justify-center items-center ${
            isSidebarOpen ? 'flex-row gap-4' : 'flex-col gap-1'
          } text-onPrimaryContainer dark:text-surfaceVariant text-center`}
        >
          <p>v.{version}</p>
          <p>•</p>
          <p>Kudos #{kudosNo}</p>
        </motion.section>
      </motion.section>
    </motion.aside>
  );
}
