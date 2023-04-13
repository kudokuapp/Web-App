'use client';
import { DeviceContext } from '$context/DeviceContext';
import { useContext } from 'react';
import Desktop, { IMyAccount } from './atomic/Desktop';
import Mobile from './atomic/Mobile';

const Sidebar = ({
  kudosNo,
  accounts,
}: {
  kudosNo: number;
  accounts: IMyAccount[];
}) => {
  const { isDesktop } = useContext(DeviceContext);

  if (isDesktop) {
    return <Desktop kudosNo={kudosNo} accounts={accounts} />;
  } else {
    return <Mobile />;
  }
};

export default Sidebar;
