'use client';
import DarkModeToggle from '$components/Switch/DarkModeToggle';
import ThemeContext from '$context/ThemeContext';
import DraggableTransactions from '$lib/DraggableTransactions';
import data from '$lib/DraggableTransactions/data/data';
import mobileinstall from '$lib/DraggableTransactions/data/mobileinstall';
import InstallButton from '$lib/InstallButton';
import Logo from '$public/logo/secondary.svg';
import LogoDark from '$public/logo/secondaryDark.svg';
import '$styles/page.css';
import client from '$utils/graphql';
import { ApolloProvider } from '@apollo/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function ApolloNextClient({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function InstallDiv({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  /* 
  @important Change this state to true on Dev!!

  Change to false on prod!!
  */
  const [hasInstall, setHasInstall] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setHasInstall(true);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(
        (registration) => {
          console.log(
            'Service Worker registration successful with scope: ',
            registration.scope
          );
        },
        (err) => {
          console.log('Service Worker registration failed: ', err);
        }
      );
    }

    window.addEventListener('offline', () => {
      toast.error('Kamu offline. Abis data apa gimana bos?');
    });
  }, []);

  return (
    <body>
      {hasInstall ? (
        <>{children}</>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <RenderedComp />
          <p className="text-xs text-onPrimaryContainer/50 dark:text-surfaceVariant/50 text-justify">
            Mager install?{' '}
            <button
              className="text-primary dark:text-primaryDark"
              onClick={() => {
                setHasInstall(true);
              }}
            >
              Lanjut via website!
            </button>
          </p>
        </motion.div>
      )}
    </body>
  );
}

const RenderedComp = () => {
  const [arrData, setArrData] = useState(data);

  const [deviceType, setDeviceType] = useState('');

  const windowRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setArrData(mobileinstall);
    }

    let hasTouchScreen = false;
    if ('maxTouchPoints' in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ('msMaxTouchPoints' in navigator) {
      // @ts-ignore
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      // @ts-ignore
      const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
      if (mQ && mQ.media === '(pointer:coarse)') {
        hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        const UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      setDeviceType('Smartphone atau Tab');
    } else {
      setDeviceType('Desktop');
    }
  }, []);

  return (
    <main className="w-[100vw] h_ios overflow-hidden relative inset-0 flex justify-center items-center">
      <section className="z-10 py-8 sm:px-12 px-10 rounded-2xl bg-background dark:bg-onBackground max-w-[500px] sm:mx-0 mx-2 sm:max-h-full max-h-[530px] overflow-auto ">
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
        <div className="flex flex-col gap-6">
          <h1 className="text-onPrimaryContainer/50 dark:text-surfaceVariant/50 sm:text-3xl text-2xl font-medium">
            Kudoku lebih keren kalo lo{' '}
            <span className="text-onPrimaryContainer dark:text-surfaceVariant">
              install di {deviceType}
            </span>{' '}
            lo.
          </h1>
          <InstallButton />
          <p className="text-xs text-onPrimaryContainer/50 dark:text-surfaceVariant/50 text-justify">
            Dengan nge-klik button diatas, lo dan kita sepakat kalo kita udah
            benci banget boncos mulu.
          </p>
        </div>
      </section>
      <div
        className="w-[100vw] h_ios__draggable absolute inset-0 z-0"
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
};
