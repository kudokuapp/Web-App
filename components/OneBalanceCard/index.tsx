'use client';

import renderImageFromInstitutionId from '$utils/kudoku/renderImageFromInstitutionId';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import moment from 'moment';
import Link from 'next/link';
import OptionsButton from './atomic/OptionsButton';
import type { IOneBalanceCard } from './index.d';

const OneBalanceCard: React.FC<IOneBalanceCard> = ({
  isSelected,
  selectedAccountRef = undefined,
  onClick,
  account,
  optionsButton,
  link,
}) => {
  return (
    <motion.div
      ref={isSelected ? selectedAccountRef : null}
      className={` ${
        isSelected
          ? 'dark:bg-onPrimary bg-onPrimary border-4 border-primary dark:border-primaryDark shadow-2xl'
          : 'dark:bg-onPrimary bg-onPrimary shadow-md border-2 border-onPrimaryContainer dark:border-outline'
      } dark:text-onPrimaryContainer text-onPrimaryContainer rounded-lg w-fit h-fit hover:cursor-pointer`}
      onClick={onClick}
      whileTap={{ scale: !isSelected ? 0.95 : 1 }}
      whileHover={{ scale: !isSelected ? 1.05 : 1 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
    >
      <Link href={link} passHref>
        <div className="flex flex-col gap-4 items-start justify-start p-4 min-w-[300px]">
          <div className="flex justify-between w-full">
            <div>
              {account.expired && (
                <p className="dark:bg-error bg-errorDark dark:text-onError text-onErrorDark px-2 py-1 rounded-md text-xs">
                  Sudah expired
                </p>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
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
              <p className="text-sm">{account.accountNumber}</p>
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
        </div>
      </Link>
    </motion.div>
  );
};

export default OneBalanceCard;
