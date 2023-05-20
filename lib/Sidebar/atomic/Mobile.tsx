import LogoWideLight from '$public/logo/secondary.svg';
import {
  faRefresh,
  faSignOut,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import menuItem from './menuItem';

export default function Mobile({
  kudosNo = 15,
  userName = 'jeinger',
}: {
  kudosNo: number;
  userName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userMenu, setUserMenu] = useState(false);
  return (
    <>
      <motion.nav
        animate={{ opacity: 1 }}
        className="w-[100vw] h-fit flex justify-between bg-[#E6E6E6] dark:bg-[#1a1b1f] fixed bottom-0 left-0 px-2 pt-1 pb-2 shadow-inner select-none"
      >
        {menuItem.map((value) => {
          return (
            <motion.button
              animate={{ opacity: 1 }}
              whileHover={{
                scale:
                  value.regex.test(pathname as string) || value.disabled
                    ? 1
                    : 1.1,
              }}
              key={value.id}
              className={`w-full flex flex-col items-center rounded-md p-1 m-1 text-sm gap-1  ${
                value.regex.test(pathname as string)
                  ? 'bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark'
                  : 'hover:bg-primary dark:hover:bg-primaryDark hover:bg-opacity-20 text-onPrimaryContainer dark:text-surfaceVariant'
              } ${value.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => {
                router.push(value.url);
              }}
              disabled={value.regex.test(pathname as string) || value.disabled}
            >
              <FontAwesomeIcon icon={value.icon} size="xl" />
              {value.name}
            </motion.button>
          );
        })}
      </motion.nav>
      <motion.nav
        animate={{ opacity: 1 }}
        className="w-full h-fit flex justify-between align-middle items-center bg-[#E6E6E6] dark:bg-[#1a1b1f] fixed top-0 left-0 px-4 pt-2 pb-2 shadow-lg select-none"
      >
        <motion.button
          animate={{ opacity: 1 }}
          className={`rounded-md text-sm gap-1`}
        >
          <a href="/kudoku">
            <Image
              src={LogoWideLight}
              height={30}
              alt="Logo Kudoku"
              layout="fixed"
              priority={true}
            />
          </a>
        </motion.button>
        <motion.button
          animate={{ opacity: 1 }}
          className={`text-sm flex items-center gap-2`}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2xl"
            className="text-primary"
            onClick={() => {
              userMenu ? setUserMenu(false) : setUserMenu(true);
            }}
          />
          <FontAwesomeIcon
            icon={faRefresh}
            size="xl"
            className="text-primary"
            onClick={() => {
              window.location.reload();
            }}
          />
        </motion.button>
        {userMenu ? (
          <div className="absolute bg-onPrimary right-8 w-40 top-10 p-3 flex flex-col rounded-md shadow-lg items-start gap-2 z-50">
            <p className="text-sm">{userName}</p>
            <p className="text-sm">Kudos #{kudosNo}</p>
            <motion.button
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                document.cookie =
                  'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                document.cookie =
                  'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                router.push('/login');
              }}
              className={`text-error w-full gap-2 flex items-center text-start text-sm`}
            >
              <FontAwesomeIcon icon={faSignOut} size="sm" />
              keluar
            </motion.button>
          </div>
        ) : (
          <></>
        )}
      </motion.nav>
    </>
  );
}
