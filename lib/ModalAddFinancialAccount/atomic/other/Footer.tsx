'use client';

import { faLock, faShieldHalved, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export function Footer() {
  const footnotes = [
    {
      logo: faShieldHalved,
      text: 'Privasi terlindungi.',
    },
    {
      logo: faX,
      text: 'Kami tidak menyimpan User ID dan Password Kamu.',
    },
    {
      logo: faLock,
      text: 'Akses read-only. Kami tidak berwenang melakukan transaksi dari akun Kamu.',
    },
  ];
  return (
    <motion.ul
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {footnotes.map((value, index) => {
        return (
          <li key={index} className="flex gap-4 items-start">
            <FontAwesomeIcon
              icon={value.logo}
              className="mt-[2px] text-primary dark:text-primaryDark w-[15px] h-[15px]"
            />
            <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
              {value.text}
            </p>
          </li>
        );
      })}
    </motion.ul>
  );
}
