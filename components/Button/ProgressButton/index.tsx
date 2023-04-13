'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import type { IProgressButton } from './index.d';

const ProgressButton: React.FC<IProgressButton> = ({
  disabled = false,
  text = 'Next',
  onClick = () => {},
  from = '10%',
  to = '100%',
}) => {
  return (
    <div className="w-full h-fit flex flex-col gap-10">
      <div className="w-full h-fit flex justify-end items-end">
        <motion.button
          type="button"
          disabled={disabled}
          animate={{
            opacity: 1,
          }}
          initial={false}
          whileHover={{ scale: disabled ? 1 : [null, 1.3, 1.1] }}
          transition={{ duration: 0.5 }}
          className={`py-2 px-4 cursor-pointer rounded-md shadow-xl font-bold flex gap-2 items-center justify-center text-base select-none ${
            disabled
              ? 'bg-gray-600 dark:bg-gray-300 cursor-not-allowed'
              : 'bg-primary dark:bg-primaryDark cursor-pointer'
          } text-onPrimary dark:text-onPrimaryDark`}
          onClick={onClick}
        >
          {text}
          <FontAwesomeIcon icon={faArrowRight} />
        </motion.button>
      </div>
      <motion.div
        className="h-[5px] bg-primary dark:bg-primaryDark rounded-md"
        animate={{ width: to }}
        style={{
          width: from,
        }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

export default ProgressButton;
