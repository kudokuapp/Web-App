'use client';
import ProgressButton, { Percentage } from '$components/ProgressButton';
import GojekImage from '$public/logo/bank/gojek.png';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import OtpInput from 'react-otp-input';

export function GopayOtp({
  onClick,
  otp,
  setOtp,
}: {
  onClick: () => void;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
}) {
  return (
    <motion.div
      className="max-w-[400px] flex flex-col gap-6 items-center justify-center"
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
          Masukkan OTP dari Gojek.
        </h6>
      </div>

      <div className="flex flex-col gap-4">
        <OtpInput
          placeholder="1234"
          value={otp}
          onChange={setOtp}
          numInputs={4}
          isInputNum={true}
          containerStyle={
            'w-full flex flex-row justify-between gap-1 mt-2 font-medium text-xl'
          }
          focusStyle={{ border: '2px solid #BA1B1B', outline: 'none' }}
          inputStyle={{
            backgroundColor: '#d6e3ff',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            color: '#001a40',
            width: '100%',
            maxWidth: '60px',
            border: '2px solid #d6e3ff',
          }}
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
        disabled={!otp || otp.length < 4}
        onClick={onClick}
        text="Lanjut"
        from="10%"
        to={((): Percentage => {
          if (otp.length === 4) {
            return '80%';
          } else if (otp !== '') {
            return '40%';
          } else {
            return '10%';
          }
        })()}
      />
    </motion.div>
  );
}
