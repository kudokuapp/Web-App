'use client';
import TextInput from '$components/InputPlaceholder/TextInput';
import ProgressButton, { Percentage } from '$components/ProgressButton';
import { faLightbulb, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { EMoneyInstitutionId } from './EMoneyInstitutionId';

export function EMoney({
  onClick,
  cardNumber,
  setCardNumber,
  balanceForDb,
  setBalanceForDb,
  institutionId,
  setInstitutionId,
}: {
  onClick: () => void;
  cardNumber: string;
  setCardNumber: Dispatch<SetStateAction<string>>;
  balanceForDb: string;
  setBalanceForDb: Dispatch<SetStateAction<string>>;
  institutionId: string;
  setInstitutionId: Dispatch<SetStateAction<string>>;
}) {
  const [initialBalance, setInitialBalance] = useState('');
  const [displayInitialBalance, setDisplayInitialBalance] = useState('Rp 0');

  return (
    <motion.div
      className="max-w-[400px] flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <FontAwesomeIcon
          icon={faWifi}
          className="text-[25px] dark:text-white text-black"
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          E-Money
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Buat akun e-money kamu
        </h6>
      </div>

      <div className="flex flex-col gap-4">
        <TextInput
          placeholder="Nomor kartu"
          id="card-number"
          value={cardNumber}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            const { key } = event;
            const value = (event.target as HTMLInputElement).value;
            const isNumber = /[0-9]/.test(key);
            const isComma = /[,]/.test(key);
            const isBackspace = key === 'Backspace';
            const isDelete = key === 'Delete';
            const isArrowLeft = key === 'ArrowLeft';
            const isArrowRight = key === 'ArrowRight';
            const isHome = key === 'Home';
            const isEnd = key === 'End';
            const hasComma = value.indexOf(',') !== -1;

            if (
              (!isNumber &&
                !isComma &&
                !isBackspace &&
                !isDelete &&
                !isArrowLeft &&
                !isArrowRight &&
                !isHome &&
                !isEnd) ||
              (isComma && hasComma)
            ) {
              event.preventDefault();
            }
          }}
          maxLength={16}
          onChange={(e) => {
            setCardNumber(e.target.value);
          }}
        />

        <EMoneyInstitutionId setInstitutionId={setInstitutionId} />

        <div className="flex flex-col gap-2">
          <TextInput
            placeholder="Balance"
            id="initial-balance"
            value={initialBalance}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              const { key } = event;
              const value = (event.target as HTMLInputElement).value;
              const isNumber = /[0-9]/.test(key);
              const isComma = /[,]/.test(key);
              const isBackspace = key === 'Backspace';
              const isDelete = key === 'Delete';
              const isArrowLeft = key === 'ArrowLeft';
              const isArrowRight = key === 'ArrowRight';
              const isHome = key === 'Home';
              const isEnd = key === 'End';
              const hasComma = value.indexOf(',') !== -1;

              if (
                (!isNumber &&
                  !isComma &&
                  !isBackspace &&
                  !isDelete &&
                  !isArrowLeft &&
                  !isArrowRight &&
                  !isHome &&
                  !isEnd) ||
                (isComma && hasComma)
              ) {
                event.preventDefault();
              }
            }}
            onKeyUp={() => {
              setDisplayInitialBalance(
                initialBalance === ''
                  ? 'Rp 0'
                  : new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(Number(balanceForDb))
              );
            }}
            onChange={(e) => {
              setInitialBalance(e.target.value);
              setBalanceForDb(e.target.value.replace(',', '.'));
            }}
          />
          <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
            {displayInitialBalance}
          </p>
        </div>
      </div>

      <div className="bg-neutralBackground px-4 flex flex-row items-center w-full h-fit text-onSurfaceVariant gap-4 rounded-md">
        <FontAwesomeIcon
          icon={faLightbulb}
          className="self-center my-4"
          size="xs"
        />
        <p className="text-xs">
          Penjelasan: Kalo kamu bingung e-money itu yang biasa buat kamu bayar
          tol / krl.
        </p>
      </div>

      <ProgressButton
        disabled={
          (!cardNumber && !initialBalance && !institutionId) ||
          !cardNumber ||
          !initialBalance ||
          !institutionId ||
          cardNumber.length < 16
        }
        onClick={onClick}
        text="Lanjut"
        from="10%"
        to={((): Percentage => {
          if (
            initialBalance !== '' &&
            cardNumber !== '' &&
            institutionId !== ''
          ) {
            return '80%';
          } else if (cardNumber !== '' || initialBalance !== '') {
            return '40%';
          } else {
            return '10%';
          }
        })()}
      />
    </motion.div>
  );
}
