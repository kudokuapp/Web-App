'use client';
import ProgressButton, { Percentage } from '$components/Button/ProgressButton';
import WaInput from '$components/InputPlaceholder/WaInput';
import GojekImage from '$public/logo/bank/gojek.png';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

export function GopayPhoneNum({
  onClick,
  phoneNumber,
  setPhoneNumber,
}: {
  onClick: () => void;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
}) {
  return (
    <motion.div
      className="max-w-[400px] flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <Image
          src={GojekImage}
          alt={`Logo Gojek`}
          width={30}
          height={30}
          quality={100}
          draggable={false}
          className="w-[30px] h-[30px]"
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Gopay
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Silahkan isi nomor HP Gopay kamu.
        </h6>
      </div>

      <div className="flex flex-col gap-4">
        <WaInput
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          id="nomor-gojek"
          placeholder="Nomor HP"
          value={phoneNumber}
        />
      </div>

      <div className="bg-neutralBackground px-4 flex flex-row items-center w-full h-fit text-onSurfaceVariant gap-4 rounded-md">
        <FontAwesomeIcon
          icon={faLightbulb}
          className="self-center my-4"
          size="xs"
        />
        <p className="text-xs">
          Dengan connect Gopay, paylater Gopay kamu otomatis ke detect.
        </p>
      </div>

      <ProgressButton
        disabled={
          !phoneNumber ||
          phoneNumber.length < 9 ||
          !/^08\d|^8\d/g.test(phoneNumber)
        }
        onClick={onClick}
        text="Lanjut"
        from="10%"
        to={((): Percentage => {
          if (phoneNumber.length >= 9) {
            return '80%';
          } else if (phoneNumber !== '') {
            return '40%';
          } else {
            return '10%';
          }
        })()}
      />
    </motion.div>
  );
}
