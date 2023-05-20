'use client';
import { DeviceContext } from '$context/DeviceContext';
import { useContext } from 'react';
import Desktop, { IMyAccount } from './atomic/Desktop';
import Mobile from './atomic/Mobile';

const Sidebar = ({
  kudosNo,
  accounts,
  userName,
}: {
  kudosNo: number;
  userName: string;
  accounts: IMyAccount[];
}) => {
  const { isDesktop } = useContext(DeviceContext);

  if (isDesktop) {
    return <Desktop kudosNo={kudosNo} accounts={accounts} />;
  } else {
    return <Mobile kudosNo={kudosNo} userName={userName} />;
  }
};

export default Sidebar;
