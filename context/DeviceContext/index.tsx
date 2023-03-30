'use client';
import { createContext, useEffect, useState } from 'react';

interface DeviceContextProps {
  isDesktop: boolean;
}

export const DeviceContext = createContext<DeviceContextProps>({
  isDesktop: false,
});

export const DeviceContextProvider: React.FC = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const isDesktopView = window.innerWidth > 768; // You can adjust this breakpoint to suit your needs
      setIsDesktop(isDesktopView);
      setHasChecked(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = hasChecked && !isDesktop ? { display: 'none' } : {};

  // if (!hasChecked) {
  //   // Return null during SSR to avoid rendering the mobile button briefly
  //   return null;
  // }

  return (
    <DeviceContext.Provider value={{ isDesktop }}>
      <div style={styles}>{children}</div>
    </DeviceContext.Provider>
  );
};
