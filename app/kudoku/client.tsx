'use client';

import { DeviceContext } from '$context/DeviceContext';
import { SidebarContext } from '$context/SidebarContext';
import Sidebar from '$lib/Sidebar';
import { IMyAccount } from '$lib/Sidebar/atomic/Desktop';
import { motion } from 'framer-motion';
import { useContext } from 'react';

export default function Client({
  children,
  accounts,
  kudosNo,
}: {
  children: React.ReactNode;
  accounts: IMyAccount[];
  kudosNo: number;
}) {
  const { isSidebarOpen } = useContext(SidebarContext);
  const { isDesktop } = useContext(DeviceContext);

  if (isDesktop) {
    return (
      <>
        <Sidebar kudosNo={kudosNo} accounts={accounts} />
        <motion.main
          animate={isSidebarOpen && isDesktop ? 'open' : 'closed'}
          variants={{ open: { marginLeft: 300 }, closed: { marginLeft: 100 } }}
        >
          {children}
        </motion.main>
      </>
    );
  } else {
    return (
      <>
        <Sidebar kudosNo={kudosNo} accounts={accounts} />
        <main className="pb-[73px]">{children}</main>
      </>
    );
  }
}
