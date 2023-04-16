'use client';

import { DeviceContext } from '$context/DeviceContext';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';

const ToastFC: React.FC = () => {
  const { isDesktop } = useContext(DeviceContext);

  if (isDesktop) {
    return <Toaster position="bottom-right" />;
  } else {
    return <Toaster position="top-center" />;
  }
};

export default ToastFC;
