'use client';
import PasswordInput from '$components/InputPlaceholder/PasswordInput';
import TextInput from '$components/InputPlaceholder/TextInput';
import ProgressButton, { Percentage } from '$components/ProgressButton';
import KlikBCAImage from '$public/logo/bank/klikbca.png';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

export function KlikBCA({
  onClick,
  userId,
  setUserId,
  password,
  setPassword,
}: {
  onClick: () => void;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) {
  return (
    <motion.div
      className="max-w-[400px] flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <Image
          src={KlikBCAImage}
          alt={`Logo Klik BCA`}
          width={30}
          height={30}
          quality={100}
          draggable={false}
          className="w-[30px] h-[30px]"
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Klik BCA
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Silahkan isi User ID dan PIN Klik BCA kamu.
        </h6>
      </div>

      <div className="flex flex-col gap-4">
        <TextInput
          placeholder="User ID"
          id="user-id"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          minLength={5}
        />
        <PasswordInput
          placeholder="PIN"
          id="pin"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          minLength={5}
        />
      </div>

      <div className="bg-neutralBackground px-4 flex flex-row items-center w-full h-fit text-onSurfaceVariant gap-4 rounded-md">
        <FontAwesomeIcon
          icon={faLightbulb}
          className="self-center my-4"
          size="xs"
        />
        <p className="text-xs">
          Tip: Kalo gapunya KlikBCA, daftar MyBCA lebih mudah.
        </p>
      </div>

      <ProgressButton
        disabled={(!userId && !password) || !userId || !password}
        onClick={onClick}
        text="Lanjut"
        from="10%"
        to={((): Percentage => {
          if (userId !== '' && password !== '') {
            return '80%';
          } else if (password !== '' || userId !== '') {
            return '40%';
          } else {
            return '10%';
          }
        })()}
      />
    </motion.div>
  );
}
