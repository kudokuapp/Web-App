'use client';

import '$styles/animation.css';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UseChromeModal, UseIOS, UseIpadOS, UseSafariModal } from './atomic';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton = () => {
  const [animate, setAnimate] = useState(false);
  const [secondAnimate, setSecondAnimate] = useState(true);
  const [ready, setReady] = useState(true);
  const [firstRender, setFirstRender] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [supported, setSupported] = useState(false);
  const [useSafari, setUseSafari] = useState(false);
  const [useIOS, setUseIOS] = useState(false);
  const [useIpadOS, setUseIpadOS] = useState(false);
  const [useChrome, setUseChrome] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(
    {} as BeforeInstallPromptEvent | null
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if ('BeforeInstallPromptEvent' in window) {
      setSupported(true);
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      });
    } else if (
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /Macintosh/.test(navigator.userAgent))
    ) {
      if (
        navigator.userAgent.match('CriOS') ||
        navigator.userAgent.match('FxiOS') ||
        navigator.userAgent.match('OPT') ||
        // @ts-ignore
        !!navigator.brave
      ) {
        setUseSafari(true);
      } else {
        if (window.innerWidth >= 450) {
          setUseIpadOS(true);
        } else {
          setUseIOS(true);
        }
      }
    } else {
      setUseChrome(true);
    }
  }, []);

  useEffect(() => {
    if (supported) {
      if (
        deferredPrompt !== null &&
        deferredPrompt !== undefined &&
        Object.keys(deferredPrompt).length !== 0
      ) {
        setReady(true);
      } else {
        setReady(false);
      }
    }
  }, [supported, deferredPrompt]);

  const installApp = async () => {
    if (
      deferredPrompt !== null &&
      deferredPrompt !== undefined &&
      Object.keys(deferredPrompt).length !== 0
    ) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        location.reload();
        console.log('😀 User accepted the install prompt.');
      } else if (outcome === 'dismissed') {
        console.log('😟 User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
  };

  const renderLoadingSpinner = () => {
    if (!ready)
      return (
        <svg
          aria-hidden="true"
          className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 dark:fill-blue-200 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      );
  };

  return (
    <>
      <motion.button
        className={`flex gap-2 items-center justify-center w-full h-fit py-2 rounded-lg shadow-xl ${
          ready
            ? 'bg-primary dark:bg-primaryDark'
            : 'bg-primary/50 dark:bg-primaryDark/50'
        }  text-onPrimary dark:text-onPrimaryDark text-xl font-bold relative`}
        onClick={async () => {
          supported ? await installApp() : setModalOpen(true);
        }}
        disabled={!ready}
        type="button"
        animate={{
          opacity: 1,
        }}
        whileHover={{ scale: ready ? [null, 1.2, 1.1] : [null, 1, 1] }}
        transition={{ duration: 0.5 }}
        onTap={(event, info) => {
          x.set(info.point.x);
          y.set(info.point.y);
          setFirstRender(true);
          setAnimate(!animate);
          animate ? setSecondAnimate(true) : setSecondAnimate(false);
        }}
      >
        {renderLoadingSpinner()}
        <FontAwesomeIcon icon={faMobileScreenButton} />
        Install
      </motion.button>

      {animate && (
        <>
          <motion.div
            className="absolute inset-0 w-fit h-fit z-20 sm:text-6xl text-4xl select-none"
            style={{
              x,
              y,
            }}
            animate={{
              y: animate ? y.get() - 100 : y.get(),
              opacity: [0, 1, 0],
              rotate: 45,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={6969}
          >
            🔥
          </motion.div>
          <motion.div
            className="absolute inset-0 w-fit h-fit z-20 sm:text-6xl text-4xl select-none"
            style={{
              x: x.get() + 40,
              y: y.get() - 20,
            }}
            animate={{
              y: animate ? y.get() - 80 : y.get(),
              opacity: [0, 1, 0],
              rotate: -80,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={6970}
          >
            🎉
          </motion.div>
          <motion.div
            className="absolute inset-0 w-fit h-fit z-20 sm:text-6xl text-4xl select-none"
            style={{
              x: x.get() - 50,
              y: y.get() + 30,
            }}
            animate={{
              y: animate ? y.get() - 70 : y.get(),
              opacity: [0, 1, 0],
              rotate: -100,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={6971}
          >
            🤯
          </motion.div>
        </>
      )}

      {firstRender && secondAnimate && (
        <>
          <motion.div
            className="absolute inset-0 w-fit h-fit z-20 sm:text-6xl text-4xl select-none"
            style={{
              x,
              y,
            }}
            animate={{
              y: secondAnimate ? y.get() - 100 : y.get(),
              opacity: [0, 1, 0],
              rotate: 45,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={6869}
          >
            🔥
          </motion.div>
          <motion.div
            className="absolute inset-0 w-fit h-fit z-20 sm:text-6xl text-4xl select-none"
            style={{
              x: x.get() + 40,
              y: y.get() - 20,
            }}
            animate={{
              y: secondAnimate ? y.get() - 80 : y.get(),
              opacity: [0, 1, 0],
              rotate: -80,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={6870}
          >
            🎉
          </motion.div>
          <motion.div
            className="absolute inset-0 w-fit h-fit z-20 sm:text-6xl text-4xl select-none"
            style={{
              x: x.get() - 50,
              y: y.get() + 30,
            }}
            animate={{
              y: secondAnimate ? y.get() - 70 : y.get(),
              opacity: [0, 1, 0],
              rotate: -100,
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={6871}
          >
            🤯
          </motion.div>
        </>
      )}

      {useChrome && (
        <UseChromeModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}

      {useSafari && (
        <UseSafariModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}

      {useIOS && (
        <UseIOS
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}

      {useIpadOS && (
        <UseIpadOS
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default InstallButton;
