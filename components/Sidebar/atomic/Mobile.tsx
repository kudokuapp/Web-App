import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import menuItem from './menuItem';

export default function Mobile() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <motion.nav
      animate={{ opacity: 1 }}
      className="w-[100vw] h-fit flex justify-between bg-[#E6E6E6] dark:bg-[#1a1b1f] fixed bottom-0 left-0 px-2 pt-1 pb-2 shadow-inner select-none"
    >
      {menuItem.map((value) => {
        return (
          <motion.button
            animate={{ opacity: 1 }}
            whileHover={{
              scale: value.url === pathname || value.disabled ? 1 : 1.1,
            }}
            key={value.id}
            className={`w-full flex flex-col items-center rounded-md p-1 m-1 text-sm gap-1  ${
              value.url === pathname
                ? 'bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark'
                : 'hover:bg-primary dark:hover:bg-primaryDark hover:bg-opacity-20 text-onPrimaryContainer dark:text-surfaceVariant'
            } ${value.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => {
              router.push(value.url);
            }}
            disabled={value.url === pathname || value.disabled}
          >
            <FontAwesomeIcon icon={value.icon} size="xl" />
            {value.name}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
