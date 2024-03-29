'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import type { ITextInput } from './index.d';
import styles from './index.module.css';

const TextInput: React.FC<ITextInput> = ({
  id = 'text',
  placeholder,
  className,
  value,
  onChange,
  error,
  errorMessage,
  onKeyDown,
  ...props
}) => {
  const [fixLabelTop, setFixLabelTop] = useState(false);

  const renderError = () => {
    if (error) {
      return `${styles.shakeit} border-error dark:border-errorDark`;
    } else {
      return 'border-outline dark:border-surface focus-within:border-primary dark:focus-within:border-secondaryDark bg-onPrimary dark:bg-onSurfaceVariant';
    }
  };

  return (
    <>
      <div className={`${styles.container} ${renderError()} `}>
        <motion.label
          htmlFor={id}
          animate={{
            top: fixLabelTop ? '-2rem' : '0.5rem',
            left: fixLabelTop ? '-0.5rem' : '0.5rem',
            opacity: fixLabelTop ? '1' : '0.5',
            scale: fixLabelTop ? '0.8' : '1',
          }}
          transition={{ duration: 1, type: 'spring' }}
          className={`${styles.label} text-onPrimaryContainer dark:text-surfaceVariant`}
        >
          {placeholder}
        </motion.label>
        <input
          {...props}
          id={id}
          className={`${styles.input} ${className} text-onPrimaryContainer dark:text-surfaceVariant`}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          onFocus={(e) => e.target.value.trim() === '' && setFixLabelTop(true)}
          onBlur={(e) => e.target.value.trim() === '' && setFixLabelTop(false)}
        />
      </div>
      {error && (
        <p className={`${styles.errorMessage} text-error dark:text-errorDark`}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default TextInput;
