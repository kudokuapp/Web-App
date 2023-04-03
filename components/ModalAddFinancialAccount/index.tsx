'use client';
import BCA from '$public/logo/bank/bca.png';
import Flazz from '$public/logo/bank/flazz.png';
import Gopay from '$public/logo/bank/gojek.png';
import cleanNum from '$utils/helper/cleanNum';
import {
  faArrowLeft,
  faClose,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import BCAMenu from './atomic/BCA/BCAMenu';
import { KlikBCA } from './atomic/BCA/KlikBCA';
import { addBcaAccount } from './atomic/BCA/mutation';
import { MyBCAInternet } from './atomic/BCA/MyBCAInternet';
import { MyBCAMobile } from './atomic/BCA/MyBCAMobile';
import { connectBca, getBcaTransaction } from './atomic/BCA/post';
import { Cash } from './atomic/Cash';
import { addCashAccount } from './atomic/Cash/mutation';
import { EMoney } from './atomic/EMoney';
import { addEMoneyAccount } from './atomic/EMoney/mutation';
import { FailedProgress } from './atomic/FailedProgress';
import { GopayOtp } from './atomic/Gopay/GopayOtp';
import { GopayPhoneNum } from './atomic/Gopay/GopayPhoneNum';
import { addEWallet, addPayLater } from './atomic/Gopay/mutation';
import {
  gopayAccount,
  gopayTransaction,
  ISendOtpGopay,
  sendOtpGopay,
} from './atomic/Gopay/post';
import { Loading } from './atomic/Loading';
import { Footer } from './atomic/other/Footer';
import { Navbar } from './atomic/other/Navbar';
import { Success } from './atomic/Success';

export function ModalAddFinancialAccount({
  isOpen = true,
  closeModal = () => {},
  token,
}: {
  isOpen: boolean;
  closeModal: () => void;
  token: string;
}) {
  /**
   * Progress yang awalnya 2: Cash
   * Progress yang awalnya 3: Debit BCA
   * Progress yang awalnya 4: Gopay
   * Progress yang awalnya 5: EMoney
   * Progress 888: success
   * Progress 999: failed
   */
  const [progress, setProgress] = useState(1);

  /**
   * Cash
   */
  const [cashAccountName, setCashAccountname] = useState('');
  const [cashInitialBalance, setCashInitialBalance] = useState('');

  /**
   * E-Money
   */
  const [eMoneyInstitutionId, setEMoneyInstitutionId] = useState('');
  const [eMoneyCardNumber, setEMoneyCardNumber] = useState('');
  const [eMoneyInitialBalance, setEMoneyInitialBalance] = useState('');

  /**
   * Klik BCA
   */
  const [klikBcaUserId, setKlikBcaUserId] = useState('');
  const [klikBcaPassword, setKlikBcaPassword] = useState('');

  /**
   * My BCA Internet
   */
  const [myBcaInternetUserId, setMyBcaInternetUserId] = useState('');
  const [myBcaInternetPassword, setMyBcaInternetPassword] = useState('');

  /**
   * My BCA Mobile
   */
  const [myBcaMobileUserId, setMyBcaMobileUserId] = useState('');
  const [myBcaMobilePassword, setMyBcaMobilePassword] = useState('');

  /**
   * Gopay
   */
  const [gopayPhoneNum, setGopayPhoneNum] = useState('');
  const [gopayOtp, setGopayOtp] = useState('');
  const [gopayOtpData, setGopayOtpData] = useState({} as ISendOtpGopay);

  const menuItems = [
    {
      title: 'Cash',
      description: 'Buat akun cash dan track secara manual',
      action: 'Create',
      type: 'manual',
      id: 1,
      icon: faMoneyBill1Wave,
      iconType: 'FontAwesome',
      disabled: false,
    },
    {
      title: 'BCA',
      description: 'Koneksikan BCA kamu lewat KlikBCA atau MyBCA',
      action: 'Connect',
      type: 'otomatis',
      id: 2,
      icon: BCA,
      iconType: 'Image',
      disable: false,
    },
    {
      title: 'Gopay',
      description: 'Koneksikan akun Gopay kamu, udah sama GopayLater',
      action: 'Connect',
      type: 'otomatis',
      id: 3,
      icon: Gopay,
      iconType: 'Image',
      disable: false,
    },
    {
      title: 'E-Money',
      description: 'Buat akun e-money kamu supaya track pengeluarannya.',
      action: 'Create',
      type: 'manual',
      id: 4,
      icon: Flazz,
      iconType: 'Image',
      disable: false,
    },
  ];

  const resetAll = () => {
    setCashAccountname('');
    setCashInitialBalance('');
    setKlikBcaUserId('');
    setKlikBcaPassword('');
    setMyBcaInternetUserId('');
    setMyBcaInternetPassword('');
    setMyBcaMobileUserId('');
    setMyBcaMobilePassword('');
    setGopayOtp('');
    setGopayPhoneNum('');
    setGopayOtpData({} as ISendOtpGopay);
    setProgress(1);
  };

  const renderProgress = () => {
    switch (progress) {
      case 1:
        return (
          <motion.section
            className="flex flex-col gap-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <section className="flex flex-col gap-4">
              {menuItems.map((value) => {
                return (
                  <section
                    key={value.id}
                    className="flex justify-between gap-4 items-center"
                  >
                    <section className="flex gap-2">
                      {value.iconType === 'FontAwesome' && (
                        <FontAwesomeIcon
                          // @ts-ignore
                          icon={value.icon}
                          className="w-[30px] h-[30px] text-[25px] dark:text-white text-black"
                        />
                      )}

                      {value.iconType === 'Image' && (
                        <Image
                          // @ts-ignore
                          src={value.icon}
                          alt={`Icon ${value.title}`}
                          width={30}
                          height={30}
                          quality={100}
                          draggable={false}
                          className="w-[30px] h-[30px]"
                        />
                      )}

                      <section className="flex flex-col gap-1">
                        <section className="flex gap-4 items-center">
                          <p className="font-bold text-lg text-onPrimaryContainer dark:text-onPrimaryContainerDark">
                            {value.title}
                          </p>
                          <p
                            className={`px-1 py-0.5 rounded-md shadow-sm text-xs flex items-center justify-center w-fit h-fit ${
                              value.type === 'otomatis'
                                ? 'bg-green-400 text-green-900'
                                : 'bg-blue-400 text-blue-900'
                            }`}
                          >
                            {value.type}
                          </p>
                        </section>
                        <p className="max-w-[250px] text-onPrimaryContainer dark:text-onPrimaryContainerDark text-sm">
                          {value.description}
                        </p>
                      </section>
                    </section>

                    <button
                      className={`px-2 py-1 w-fit h-fit font-medium text-base rounded-md shadow-lg ${
                        value.disable
                          ? 'bg-gray-600 dark:bg-gray-300'
                          : 'bg-primary dark:bg-primaryDark hover:bg-secondary dark:hover:bg-secondaryDark'
                      } text-onPrimary dark:text-onPrimaryDark`}
                      disabled={value.disable}
                      onClick={() => {
                        switch (value.title) {
                          case 'Cash':
                            setProgress(20);
                            break;

                          case 'BCA':
                            setProgress(30);
                            break;

                          case 'Gopay':
                            setProgress(40);
                            break;

                          case 'E-Money':
                            setProgress(50);
                            break;
                        }
                      }}
                    >
                      {value.action}
                    </button>
                  </section>
                );
              })}
            </section>

            <Footer />
          </motion.section>
        );

      case 20:
        return (
          <Cash
            onClick={() => {
              setProgress(21);
              addCashAccount({
                accountName: cashAccountName,
                displayPicture: null,
                startingBalance: cashInitialBalance,
                currency: 'IDR',
                token,
              })
                .then(() => {
                  setTimeout(() => {
                    setProgress(888);
                  }, 2500); // Wait for 2.5 second before setting progress to 888
                })
                .catch((e) => {
                  console.error(e);
                  setProgress(999);
                });
            }}
            accountName={cashAccountName}
            setAccountName={setCashAccountname}
            balanceForDb={cashInitialBalance}
            setBalanceForDb={setCashInitialBalance}
          />
        );

      case 21:
        return <Loading text="Lagi buat akun Cash kamu..." />;

      case 30:
        return (
          <BCAMenu
            onClickKlikBca={() => setProgress(31)}
            onClickMyBcaInternet={() => setProgress(32)}
            onClickMyBcaMobile={() => setProgress(33)}
          />
        );

      /**
       * Klik BCA
       */
      case 31:
        return (
          <KlikBCA
            onClick={async () => {
              try {
                setProgress(311);

                console.log(`connectBca starts running`);

                const accountResponse = await connectBca({
                  token,
                  brickInstitutionId: 2,
                  username: klikBcaUserId,
                  password: klikBcaPassword,
                });

                if (!accountResponse.accessToken) {
                  setProgress(999);
                  throw new Error('accessToken is null');
                }

                const transactionResponse = await getBcaTransaction({
                  token,
                  accessToken: accountResponse.accessToken,
                });

                if (!accountResponse || !transactionResponse) {
                  setProgress(999);
                  throw new Error('account and transaction is null');
                }

                addBcaAccount({
                  token,
                  account: accountResponse,
                  transaction: transactionResponse,
                })
                  .then(() => {
                    setProgress(888);
                  })
                  .catch(() => {
                    setProgress(999);
                  });
              } catch (error) {
                console.error(error);
                setProgress(999);
              }
            }}
            userId={klikBcaUserId}
            setUserId={setKlikBcaUserId}
            password={klikBcaPassword}
            setPassword={setKlikBcaPassword}
          />
        );

      case 311:
        return <Loading text="Lagi coba connect BCA via KlikBCA..." />;

      /**
       * MyBCA Internet
       */
      case 32:
        return (
          <MyBCAInternet
            onClick={async () => {
              try {
                setProgress(322);

                const accountResponse = await connectBca({
                  token,
                  brickInstitutionId: 37,
                  username: myBcaInternetUserId,
                  password: myBcaInternetPassword,
                });

                if (!accountResponse.accessToken) {
                  setProgress(999);
                  throw new Error('accessToken is null');
                }

                const transactionResponse = await getBcaTransaction({
                  token,
                  accessToken: accountResponse.accessToken,
                });

                if (!accountResponse || !transactionResponse) {
                  setProgress(999);
                  throw new Error('account and transaction is null');
                }

                addBcaAccount({
                  token,
                  account: accountResponse,
                  transaction: transactionResponse,
                })
                  .then(() => {
                    setProgress(888);
                  })
                  .catch(() => {
                    setProgress(999);
                  });
              } catch (error) {
                console.error(error);
                setProgress(999);
              }
            }}
            userId={myBcaInternetUserId}
            setUserId={setMyBcaInternetUserId}
            password={myBcaInternetPassword}
            setPassword={setMyBcaInternetPassword}
          />
        );

      case 322:
        return <Loading text="Lagi coba connect BCA via MyBCA..." />;

      /**
       * MyBCA Mobile
       */
      case 33:
        return (
          <MyBCAMobile
            onClick={async () => {
              try {
                setProgress(322);

                const accountResponse = await connectBca({
                  token,
                  brickInstitutionId: 38,
                  username: myBcaMobileUserId,
                  password: myBcaMobilePassword,
                });

                if (!accountResponse.accessToken) {
                  setProgress(999);
                  throw new Error('accessToken is null');
                }

                const transactionResponse = await getBcaTransaction({
                  token,
                  accessToken: accountResponse.accessToken,
                });

                if (!accountResponse || !transactionResponse) {
                  setProgress(999);
                  throw new Error('account and transaction is null');
                }

                addBcaAccount({
                  token,
                  account: accountResponse,
                  transaction: transactionResponse,
                })
                  .then(() => {
                    setProgress(888);
                  })
                  .catch(() => {
                    setProgress(999);
                  });
              } catch (error) {
                console.error(error);
                setProgress(999);
              }
            }}
            userId={myBcaMobileUserId}
            setUserId={setMyBcaMobileUserId}
            password={myBcaMobilePassword}
            setPassword={setMyBcaMobilePassword}
          />
        );

      /**
       * Gopay
       */
      case 40:
        return (
          <GopayPhoneNum
            onClick={() => {
              toast
                .promise(
                  sendOtpGopay({
                    phoneNumber: `+62${cleanNum(gopayPhoneNum)}`,
                    token,
                  }),
                  {
                    loading: 'Kirim OTP dari Gojek...',
                    success: 'Kirim OTP sukses! yuk cek HPmu',
                    error: 'Error dari Gojek!',
                  }
                )
                .then((data) => {
                  //FULFILLED
                  setGopayOtpData({ ...data });
                  setProgress(41);
                });
            }}
            phoneNumber={gopayPhoneNum}
            setPhoneNumber={setGopayPhoneNum}
          />
        );

      case 41:
        return (
          <GopayOtp
            otp={gopayOtp}
            setOtp={setGopayOtp}
            onClick={async () => {
              try {
                const gopayAccountRes = await gopayAccount({
                  sendOtpData: gopayOtpData,
                  otp: gopayOtp,
                  token,
                });

                const eWalletAccount = gopayAccountRes.eWallet;
                const payLaterAccount = gopayAccountRes.payLater;

                if (
                  !eWalletAccount.accessToken ||
                  !payLaterAccount.accessToken
                ) {
                  setProgress(999);
                  throw new Error('accessToken is null');
                }

                const gopayTransactionRes = await gopayTransaction({
                  accessToken: eWalletAccount.accessToken,
                  token,
                });

                const eWalletTransaction = gopayTransactionRes.eWallet;
                const payLaterTransaction = gopayTransactionRes.payLater;

                await addEWallet({
                  token,
                  account: eWalletAccount,
                  transaction: eWalletTransaction,
                });
                await addPayLater({
                  token,
                  account: payLaterAccount,
                  transaction: payLaterTransaction,
                });

                setProgress(888);
              } catch (error) {
                console.error(error);
                setProgress(999);
              }
            }}
          />
        );

      /**
       *  E-Money
       */

      case 50:
        return (
          <EMoney
            onClick={() => {
              setProgress(51);
              addEMoneyAccount({
                institutionId: eMoneyInstitutionId,
                cardNumber: eMoneyCardNumber,
                initialBalance: eMoneyInitialBalance,
                token,
              })
                .then(() => {
                  setTimeout(() => {
                    setProgress(888);
                  }, 2500); // Wait for 2.5 second before setting progress to 888
                })
                .catch((e) => {
                  console.error(e);
                  setProgress(999);
                });
            }}
            cardNumber={eMoneyCardNumber}
            setCardNumber={setEMoneyCardNumber}
            balanceForDb={eMoneyInitialBalance}
            setBalanceForDb={setEMoneyInitialBalance}
            institutionId={eMoneyInstitutionId}
            setInstitutionId={setEMoneyInstitutionId}
          />
        );

      case 51:
        return <Loading text="Lagi buat akun e-money kamu..." />;

      case 888:
        return (
          <Success
            onClick={() => {
              resetAll();
            }}
          />
        );

      case 999:
        return (
          <FailedProgress
            onClick={() => {
              resetAll();
            }}
          />
        );
    }
  };

  const renderTitle = () => {
    switch (progress) {
      case 1:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <Navbar />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 20:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setCashAccountname('');
                setCashInitialBalance('');
                setProgress(1);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 21:
        return <></>;

      case 30:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setProgress(1);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 31:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setKlikBcaPassword('');
                setKlikBcaUserId('');
                setProgress(30);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 311:
        return <></>;

      case 32:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setMyBcaInternetUserId('');
                setMyBcaInternetPassword('');
                setProgress(30);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 322:
        return <></>;

      case 33:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setMyBcaMobileUserId('');
                setMyBcaMobilePassword('');
                setProgress(30);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 40:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setGopayPhoneNum('');
                setProgress(1);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 41:
        return (
          <Dialog.Title
            as="div"
            className="w-full flex justify-between border-b-[1px] border-gray-600 dark:border-gray-400 pb-2"
          >
            <GoBackButon
              onClick={() => {
                setGopayOtp('');
                setGopayPhoneNum('');
                setGopayOtpData({} as ISendOtpGopay);
                setProgress(40);
              }}
            />
            <button
              onClick={() => {
                resetAll();
                closeModal();
              }}
              className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </Dialog.Title>
        );

      case 888:
        return <></>;

      case 999:
        return <></>;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100000000000] select-none"
        onClose={() => {
          return;
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background dark:bg-onBackground bg-opacity-70 dark:bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-onPrimary dark:bg-onSurfaceVariant p-6 text-left align-middle shadow-xl transition-all">
                <Toaster position="top-right" />
                {renderTitle()}

                <section className="mt-10">{renderProgress()}</section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function GoBackButon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center text-lg font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      Kembali
    </button>
  );
}
