'use client';
import DarkModeToggle from '$components/Switch/DarkModeToggle';
import ThemeContext from '$context/ThemeContext';
import DraggableTransactions from '$lib/DraggableTransactions';
import data from '$lib/DraggableTransactions/data/data';
import mobiledata from '$lib/DraggableTransactions/data/mobile';
import Logo from '$public/logo/secondary.svg';
import LogoDark from '$public/logo/secondaryDark.svg';
import '$styles/page.css';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [arrData, setArrData] = useState(data);
  const windowRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth <= 640) {
      setArrData(mobiledata);
    }
  }, []);

  return (
    <main className="w-[100vw] h-[100vh] overflow-hidden relative inset-0 flex justify-center items-center">
      <section className="z-10 py-8 sm:px-12 px-10 rounded-2xl shadow-xl bg-onPrimary dark:bg-onSurfaceVariant max-w-[500px] sm:mx-0 mx-2 sm:max-h-full max-h-[90vh] overflow-auto">
        <nav className="flex justify-between items-center mb-10 select-none relative">
          <Toaster
            position="top-right"
            containerStyle={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
          {isDarkTheme ? (
            <Image
              height={30}
              src={LogoDark}
              quality={100}
              alt="Kudoku Logo"
              draggable={false}
            />
          ) : (
            <Image
              height={30}
              src={Logo}
              quality={100}
              alt="Kudoku Logo"
              draggable={false}
            />
          )}

          <DarkModeToggle />
        </nav>
        {children}
      </section>
      <div
        className="w-[calc(100vw+200px)] h-[calc(100vh+50px)] absolute inset-0 translate-y-[-25px] translate-x-[-100px] z-0"
        ref={windowRef}
      >
        {arrData.map((value) => {
          return (
            <DraggableTransactions
              amount={value.amount}
              merchant={value.merchant}
              imageSrc={value.imageSrc}
              spawn={value.spawn}
              key={value.id}
              customRef={windowRef}
            />
          );
        })}
      </div>
    </main>
  );
}
