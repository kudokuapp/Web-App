'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import type { ILoginButton } from './index.d';
import styles from './index.module.css';

const LoginButton: React.FC<ILoginButton> = ({
  disabled,
  onClick = () => {},
  children,
}) => {
  return (
    <motion.button
      type="submit"
      disabled={disabled}
      animate={{
        opacity: 1,
      }}
      whileHover={{ scale: [null, 1.3, 1.1] }}
      transition={{ duration: 0.5 }}
      className={`${styles.button} bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark`}
      onClick={onClick}
    >
      {children}
      <FontAwesomeIcon icon={faArrowRight} />
    </motion.button>
  );
};

export default LoginButton;
