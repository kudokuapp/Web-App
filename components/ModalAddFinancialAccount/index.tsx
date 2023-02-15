import PasswordInput from '$components/InputPlaceholder/PasswordInput';
import TextInput from '$components/InputPlaceholder/TextInput';
import Logo from '$public/logo/primary.svg';
import { useMutation } from '@apollo/client';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  mutationAddCashAccount,
  mutationConnectBCA,
} from 'app/kudoku/mutation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './index.module.css';

export const ModalAddFinancialAccount = ({
  setIsAddAccount,
}: {
  setIsAddAccount: any;
}) => {
  const [id, setId] = useState(0);
  const [accountName, setAccountName] = useState('');
  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState('');
  const router = useRouter();
  const menuItems = [
    {
      title: 'Manual',
      description: 'Use this to track your transaction manually',
      action: 'Create',
      id: 1,
    },
    {
      title: 'BCA',
      description: 'PT. Bank Central Asia, Tbk',
      action: 'Connect',
      id: 2,
    },
    {
      title: 'GOPAY',
      description: 'PT. Gojek Indonesia',
      action: 'Soon',
      id: 3,
    },
  ];

  const [addCashAccount] = useMutation(mutationAddCashAccount, {
    variables: {
      accountName: accountName,
      startingBalance: balance,
      currency: 'IDR',
    },
  });

  const [connectBCA] = useMutation(mutationConnectBCA, {
    variables: {
      brickInstitutionId: 2,
      username: username,
      password: password,
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const addAccountCash = () => {
      return new Promise((resolve, reject) => {
        addCashAccount()
          .then((res: any) => {
            setAccountName(res.data.addCashAccount.accountName);
            setBalance(res.data.addCashAccount.balance);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    toast
      .promise(addAccountCash(), {
        loading: 'Loading...',
        success: 'Akun cash berhasil ditambahkan!',
        error: 'Akun cash gagal ditambahkan!',
      })
      .then(() => {
        window.location.reload();
      });
  };
  const handleSubmitBCA: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const connectBCaccount = () => {
      return new Promise((resolve, reject) => {
        connectBCA()
          .then((res: any) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    toast
      .promise(connectBCaccount(), {
        loading: 'Loading...',
        success: 'Akun BCA berhasil terhubung!',
        error: 'Akun BCA gagal terhubung!',
      })
      .then(() => {
        // window.location.reload();
      });
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div
          className={`${styles.modalBody} bg-onPrimary dark:bg-onSurfaceVariant text-black dark:text-surface`}
        >
          {id === 0 ? (
            <>
              <div className="flex px-4 flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                  <Image
                    height={20}
                    src={Logo}
                    quality={100}
                    alt="Kudoku Logo"
                    draggable={false}
                  />
                  <h4 className="text-xl">Add financial account</h4>
                </div>
                <button onClick={() => setIsAddAccount((c: any) => !c)}>
                  x
                </button>
              </div>
              <p className="text-sm px-4 my-2">
                Create or connect your financial accounts.
              </p>
              <hr className="border-b-2" />
              <div className={styles.modalContent}>
                {menuItems.map(({ title, description, action, id }) => (
                  <>
                    <div className="flex flex-row py-4 align-middle justify-between items-center w-full border-b-2">
                      <div className="flex flex-row gap-4 items-center">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} size="sm" />
                        <div>
                          <h3 className={`flex rounded text-xl cursor-pointer`}>
                            {title}
                          </h3>
                          <p className="text-xs">{description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setId((c) => (c = id))}
                        className={
                          title === 'GOPAY'
                            ? `bg-outline px-8 rounded py-1 dark:hover:bg-outline cursor-not-allowed`
                            : `${styles.buttonAction} dark:bg-primaryDark dark:hover:bg-secondaryDark dark:text-primaryContainerDark`
                        }
                        disabled={title === 'GOPAY' ? true : false}
                      >
                        {action}
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : id === 1 ? (
            <>
              <div className="flex px-4 gap-4 relative flex-row items-center">
                <Toaster
                  position="top-right"
                  containerStyle={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                />
                <button onClick={() => setId((c) => (c = 0))}>
                  <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                </button>
                <div>
                  <h4 className="text-xl">Creating manual account</h4>
                  <p className="text-sm my-2">
                    Use manual account to track transaction manually.
                  </p>
                </div>
              </div>
              <hr className="border-b-2" />
              <div className={styles.modalContent}>
                <FontAwesomeIcon
                  icon={faMoneyBill1Wave}
                  className="self-center my-4"
                  size="xl"
                />
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 w-full"
                >
                  <TextInput
                    placeholder="Account name"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => {
                      setAccountName(e.target.value);
                    }}
                  />
                  <TextInput
                    placeholder="Inital balance"
                    id="initialBalance"
                    value={balance}
                    onChange={(e) => {
                      setBalance(e.target.value);
                    }}
                  />
                  <button
                    disabled={!accountName || !balance}
                    className="w-full bg-primary hover:bg-secondary dark:bg-primaryDark dark:hover:bg-secondaryDark dark:text-primaryContainerDark text-white py-2 rounded-md my-2"
                  >
                    Create
                  </button>
                  <div className="bg-neutralBackground px-4 flex flex-row items-center text-onSurfaceVariant gap-4 rounded-md mb-10">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="self-center my-4"
                      size="xs"
                    />
                    <p className="text-xs">
                      You can create manual account as many as you want.
                    </p>
                  </div>
                </form>
              </div>
            </>
          ) : id === 2 ? (
            <>
              <div className="flex px-4 gap-4 relative flex-row items-center">
                <Toaster
                  position="top-right"
                  containerStyle={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                />
                <button onClick={() => setId((c) => (c = 0))}>
                  <FontAwesomeIcon icon={faArrowLeft} size="sm" />
                </button>
                <div>
                  <h4 className="text-xl">Connect Klik BCA</h4>
                  <p className="text-sm my-2">PT. Bank Central Asia, Tbk</p>
                </div>
              </div>
              <hr className="border-b-2" />
              <div className={styles.modalContent}>
                <h3 className="font-bold self-center text-xl">Klik BCA</h3>
                <h4 className="font-bold self-center text-md">
                  Klik BCA Internet Banking
                </h4>
                <p className="text-sm self-center">
                  Masukan User ID & PIN kamu
                </p>
                <form
                  onSubmit={handleSubmitBCA}
                  className="flex flex-col gap-2 w-full"
                >
                  <TextInput
                    placeholder="User ID"
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUserame(e.target.value);
                    }}
                  />
                  <PasswordInput
                    placeholder="PIN"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    disabled={!username || !password}
                    className="w-full bg-primary hover:bg-secondary dark:bg-primaryDark dark:hover:bg-secondaryDark dark:text-primaryContainerDark text-white py-2 rounded-md my-2"
                  >
                    Connect
                  </button>
                  <div className="bg-neutralBackground px-4 flex flex-row items-center text-onSurfaceVariant gap-4 rounded-md mb-10">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="self-center my-4"
                      size="xs"
                    />
                    <p className="text-xs">
                      You can create manual account as many as you want.
                    </p>
                  </div>
                </form>
              </div>
            </>
          ) : id === 3 ? (
            <>x</>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
