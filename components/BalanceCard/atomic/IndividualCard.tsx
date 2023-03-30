import renderImageFromInstitutionId from '$utils/helper/renderImageFromInstitutionId';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import moment from 'moment';
import Link from 'next/link';
import { HTMLProps, MouseEventHandler, RefObject } from 'react';
import OptionsButton, { IOptionsButton } from './OptionsButton';

export interface IIndividualCard extends HTMLProps<HTMLButtonElement> {
  isSelected: boolean;
  selectedAccountRef: RefObject<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  account: {
    institutionId: string;
    accountNumber: string;
    balance: string;
    latestTransaction: string | null;
    createdAt: string;
    type: 'Cash' | 'Debit' | 'EWallet' | 'EMoney' | 'PayLater';
    expired: boolean;
  };
  optionsButton: IOptionsButton;

  link: string;
}

const IndividualCard: React.FC<IIndividualCard> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  account,
  optionsButton,
  link,
}) => {
  return (
    <motion.button
      ref={isSelected ? selectedAccountRef : null}
      className={` ${
        isSelected
          ? 'dark:bg-yellow-400 bg-yellow-900'
          : 'dark:bg-onPrimary bg-onPrimaryDark'
      } dark:text-onPrimaryContainer text-onPrimary rounded-lg shadow-2xl`}
      onClick={onClick}
      whileTap={{ scale: !isSelected ? 0.95 : 1 }}
      whileHover={{ scale: !isSelected ? 1.05 : 1 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    >
      <Link
        href={link}
        passHref
        className="flex flex-col gap-4 items-start justify-start p-4 min-w-[300px]"
      >
        <div className="flex justify-between w-full">
          <div className="w-[20px] h-[20px]">
            {account.institutionId === 'Cash' && (
              <FontAwesomeIcon icon={faMoneyBill1Wave} size="sm" />
            )}
            {account.institutionId !== 'Cash' &&
              renderImageFromInstitutionId({
                institutionId: account.institutionId as string,
                height: 20,
              })}
          </div>
          <div className="flex flex-col gap-2">
            <p className="">{account.accountNumber}</p>
            {account.expired && (
              <p className="dark:bg-error bg-errorDark dark:text-onError text-onErrorDark px-2 py-1 rounded-md">
                Sudah expired
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start justify-start">
          <p className="text-2xl font-medium">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(Number(account.balance))}
          </p>
          <div className="flex flex-col gap-0 items-start justify-start">
            <p className="text-sm">
              Transaksi terkahir:{' '}
              {account.latestTransaction
                ? moment(account.latestTransaction).format('DD MMMM YYYY')
                : 'Belum ada transaksi'}
            </p>
            <p className="text-sm">
              Akun dibuat: {moment(account.createdAt).format('DD MMMM YYYY')}
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full items-center">
          <p>{account.type}</p>

          <OptionsButton
            editAccount={optionsButton.editAccount}
            deleteAccount={optionsButton.deleteAccount}
          />
        </div>
      </Link>
    </motion.button>
  );
};

export default IndividualCard;
