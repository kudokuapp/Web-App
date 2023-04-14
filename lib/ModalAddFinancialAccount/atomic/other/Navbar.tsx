'use client';

import ThemeContext from '$context/ThemeContext';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';

export function Navbar() {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <motion.nav
      className="flex justify-between select-none bg-onPrimary dark:bg-onSurfaceVariant py-2 rounded-t-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toaster />
      <div className="flex gap-2 items-center">
        {isDarkTheme ? (
          <Image
            height={18}
            width={18}
            src={LogoPrimaryDark}
            quality={100}
            alt="Kudoku Logo"
            draggable={false}
          />
        ) : (
          <Image
            height={18}
            width={18}
            src={LogoPrimaryLight}
            quality={100}
            alt="Kudoku Logo"
            draggable={false}
          />
        )}
        <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Koneksikan akun kamu
        </p>
      </div>
    </motion.nav>
  );
}
