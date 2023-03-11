'use client';

import isAutomaticAccount from '$utils/helper/isAutomaticAccount';
import renderImageFromInstitutionId from '$utils/helper/renderImageFromInstitutionId';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import moment from 'moment';
import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useRef } from 'react';
import { IFetchAllAccounts } from './layout';

interface IClientProps {
  accounts: IFetchAllAccounts[];
}

export default function Client({ accounts }: IClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const createIdRegex = (id: string): RegExp => {
    const regexStr = `(.*)${id}(.*)`;
    return new RegExp(regexStr);
  };

  const selectedAccountIndex = accounts.findIndex(({ id }) =>
    createIdRegex(id as string).test(pathname as string)
  );
  // const selectedAccountRef = useRef<HTMLButtonElement>(null);

  // const scrollToSelectedAccount = () => {
  //   if (selectedAccountRef.current) {
  //     selectedAccountRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',
  //       inline: 'center',
  //     });
  //   }
  // };

  // useEffect(() => {
  //   scrollToSelectedAccount();
  // }, [pathname, selectedAccountRef]);

  const handleClick = (type: string, id: string) => {
    router.push(`kudoku/transaction/${type.toLowerCase()}/${id}`);

    // scrollToSelectedAccount();
  };

  return (
    <>
      <div className="flex gap-0 w-full h-fit overflow-x-auto items-start justify-start p-4">
        {accounts.map((value, index) => {
          const {
            accountNumber,
            balance,
            institutionId,
            type,
            id,
            latestTransaction,
            createdAt,
          } = value;

          const isSelected = selectedAccountIndex === index;

          return (
            <motion.button
              key={index}
              // ref={isSelected ? selectedAccountRef : null}
              className={`flex flex-col gap-4 items-start justify-start rounded-lg shadow-2xl p-4 min-w-[300px] ${
                isSelected
                  ? 'dark:bg-yellow-400 bg-yellow-900'
                  : 'dark:bg-onPrimary bg-onPrimaryDark'
              } dark:text-onPrimaryContainer text-onPrimary`}
              onClick={() => handleClick(type, id as string)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
            >
              <div className="flex justify-between w-full">
                <div className="w-[20px] h-[20px]">
                  {institutionId === 'Cash' && (
                    <FontAwesomeIcon icon={faMoneyBill1Wave} size="sm" />
                  )}
                  {institutionId !== 'Cash' &&
                    renderImageFromInstitutionId({
                      institutionId: institutionId as string,
                      height: 20,
                    })}
                </div>
                <p className="">{accountNumber}</p>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start">
                <p className="text-2xl font-medium">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(Number(balance))}
                </p>
                <div className="flex flex-col gap-0 items-start justify-start">
                  <p className="text-sm">
                    Transaksi terkahir:{' '}
                    {latestTransaction
                      ? moment(latestTransaction).format('DD MMMM YYYY')
                      : 'Belum ada transaksi'}
                  </p>
                  <p className="text-sm">
                    Akun dibuat: {moment(createdAt).format('DD MMMM YYYY')}
                  </p>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <p>{type}</p>

                <p
                  className={`px-1 py-0.5 rounded-md shadow-sm text-xs flex items-center justify-center w-fit h-fit ${
                    isAutomaticAccount(institutionId as string)
                      ? 'bg-green-400 text-green-900'
                      : 'bg-blue-400 text-blue-900'
                  }`}
                >
                  {isAutomaticAccount(institutionId as string)
                    ? 'otomatis'
                    : 'manual'}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
