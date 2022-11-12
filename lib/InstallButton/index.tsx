'use client';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import first from './image/first.jpg';
import second from './image/second.jpg';
import third from './image/third.jpg';

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
  const [firstRender, setFirstRender] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [supported, setSupported] = useState(false);
  const [useSafari, setUseSafari] = useState(false);
  const [useIOS, setUseIOS] = useState(false);
  const [useChrome, setUseChrome] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(
    {} as BeforeInstallPromptEvent | null
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if ('BeforeInstallPromptEvent' in window) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            );
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      }
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
        setUseIOS(true);
      }
    } else {
      setUseChrome(true);
    }
  }, []);

  const installApp = async () => {
    deferredPrompt?.prompt();
    const { outcome } = await deferredPrompt!.userChoice;
    setDeferredPrompt(null);
    if (outcome === 'accepted') {
      console.log('😀 User accepted the install prompt.');
    } else if (outcome === 'dismissed') {
      console.log('😟 User dismissed the install prompt');
    }
  };

  return (
    <>
      <motion.button
        className="flex gap-2 items-center justify-center w-full h-fit py-2 rounded-lg shadow-xl bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark text-xl font-bold relative"
        onClick={async () => {
          supported ? await installApp() : setModalOpen(true);
        }}
        type="button"
        animate={{
          opacity: 1,
        }}
        whileHover={{ scale: [null, 1.2, 1.1] }}
        // whileTap={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.5 }}
        onTap={(event, info) => {
          x.set(info.point.x);
          y.set(info.point.y);
          setFirstRender(true);
          setAnimate(!animate);
          animate ? setSecondAnimate(true) : setSecondAnimate(false);
        }}
      >
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
    </>
  );
};

const UseChromeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-onBackground/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-primary"
                >
                  Browser Tidak Mendukung
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-xl text-onPrimaryContainer">
                    Silahkan coba lagi dengan menggunakan browser{' '}
                    <span className="font-bold">Chrome</span>.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-xl font-medium text-onPrimary hover:bg-primary/50 focus:outline-none shadow-xl"
                    onClick={onClose}
                  >
                    Siap bosku
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const UseSafariModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-onBackground/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-primary"
                >
                  Browser Tidak Mendukung
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-xl text-onPrimaryContainer">
                    Silahkan coba lagi dengan menggunakan browser{' '}
                    <span className="font-bold">Safari</span>.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-xl font-medium text-onPrimary hover:bg-primary/50 focus:outline-none shadow-xl"
                    onClick={onClose}
                  >
                    Siap bosku
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const UseIOS = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ref = useRef<SheetRef>();
  return (
    <Sheet isOpen={isOpen} onClose={onClose} ref={ref}>
      <Sheet.Container>
        <Sheet.Header>
          <h1 className="font-bold text-2xl px-8 py-4 text-primary">
            Install di iOS
          </h1>
        </Sheet.Header>
        <Sheet.Content>
          <div className="w-full h-full overflow-auto">
            <div className="flex flex-col gap-14 px-8 pb-4">
              <div className="flex flex-col gap-4">
                <h2 className="text-onPrimaryContainer text-xl">
                  <span className="font-bold text-primary">1.</span> Tekan icon{' '}
                  <svg
                    width="35"
                    height="46"
                    viewBox="0 0 35 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline mx-2 w-[25px]"
                  >
                    <path
                      d="M17.4901 29.8397C18.338 29.8397 19.0676 29.127 19.0676 28.2956V7.96448L18.9493 4.99499L20.2704 6.40055L23.2676 9.60759C23.5437 9.92434 23.938 10.0827 24.3324 10.0827C25.1408 10.0827 25.7718 9.48881 25.7718 8.67716C25.7718 8.26143 25.5944 7.94468 25.2986 7.64773L18.6338 1.19405C18.2394 0.798122 17.9042 0.659546 17.4901 0.659546C17.0958 0.659546 16.7606 0.798122 16.3465 1.19405L9.68169 7.64773C9.38592 7.94468 9.22817 8.26143 9.22817 8.67716C9.22817 9.48881 9.81972 10.0827 10.6479 10.0827C11.0225 10.0827 11.4563 9.92434 11.7324 9.60759L14.7099 6.40055L16.0507 4.99499L15.9324 7.96448V28.2956C15.9324 29.127 16.6423 29.8397 17.4901 29.8397ZM6.19155 45.3404H28.8085C32.9296 45.3404 35 43.2816 35 39.2035V19.4465C35 15.3684 32.9296 13.3096 28.8085 13.3096H23.307V16.4968H28.7493C30.7014 16.4968 31.8254 17.5658 31.8254 19.6247V39.0253C31.8254 41.0841 30.7014 42.1531 28.7493 42.1531H6.23099C4.25915 42.1531 3.17465 41.0841 3.17465 39.0253V19.6247C3.17465 17.5658 4.25915 16.4968 6.23099 16.4968H11.693V13.3096H6.19155C2.07042 13.3096 0 15.3684 0 19.4465V39.2035C0 43.2816 2.07042 45.3404 6.19155 45.3404Z"
                      fill="#007AFF"
                    />
                  </svg>
                  dibagian bawah browser ini (
                  <span className="font-bold">Safari</span>
                  ).
                </h2>
                <Image src={first} alt="" draggable={false} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-onPrimaryContainer text-xl">
                  <span className="font-bold text-primary">2.</span> Scroll
                  kebawah, sampe ketemu tulisan &quot;Add to Home Screen&quot;
                  yang ada icon
                  <svg
                    width="37"
                    height="38"
                    viewBox="0 0 37 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline mx-2 w-[25px]"
                  >
                    <path
                      d="M6.20848 37.0009H30.7915C32.581 37.0009 34.0283 36.5124 35.0265 35.5082C36.0243 34.5046 36.5 33.0595 36.5 31.2978V6.70221C36.5 4.94051 36.0243 3.49543 35.0265 2.49176C34.0283 1.48756 32.581 0.999146 30.7915 0.999146H6.20848C4.42316 0.999146 2.97523 1.47395 1.97536 2.47279C0.975408 3.47171 0.5 4.91843 0.5 6.70221V31.2978C0.5 33.0816 0.975407 34.5283 1.97536 35.5272C2.97523 36.5261 4.42316 37.0009 6.20848 37.0009ZM6.25932 34.8438C4.98675 34.8438 4.10851 34.5172 3.54579 33.9548C2.98312 33.3925 2.65523 32.514 2.65523 31.238V6.76201C2.65523 5.48704 2.98308 4.60836 3.54584 4.04578C4.10863 3.48317 4.98692 3.15616 6.25932 3.15616H30.7407C31.9614 3.15616 32.844 3.48103 33.4217 4.04878C33.9978 4.61502 34.3447 5.49562 34.3447 6.76201V31.238C34.3447 32.5054 33.9978 33.3859 33.4217 33.9518C32.8441 34.5193 31.9616 34.8438 30.7407 34.8438H6.25932Z"
                      fill="#007AFF"
                      stroke="#007AFF"
                    />
                    <path
                      d="M9.27966 18.9509C9.27966 19.5092 9.76268 20.0321 10.3662 20.0321H17.3942V27.0619C17.3942 27.3752 17.5366 27.6451 17.7258 27.8303C17.9131 28.0136 18.1793 28.1467 18.4754 28.1467C19.0397 28.1467 19.6075 27.7278 19.6075 27.0619V20.0321H26.6355C26.9488 20.0321 27.2187 19.8897 27.4039 19.7005C27.5872 19.5133 27.7203 19.247 27.7203 18.9509C27.7203 18.3866 27.3014 17.8188 26.6355 17.8188H19.6075V10.7908C19.6075 10.124 19.0407 9.70428 18.4754 9.70428C17.9172 9.70428 17.3942 10.1872 17.3942 10.7908V17.8188H10.3662C9.69949 17.8188 9.27966 18.3856 9.27966 18.9509Z"
                      fill="#007AFF"
                      stroke="#007AFF"
                    />
                  </svg>
                  .
                </h2>
                <Image src={second} alt="" draggable={false} />
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-onPrimaryContainer text-xl">
                  <span className="font-bold text-primary">3.</span> Langsung
                  aja gas tekan tombol &quot;Add&quot;.
                </h2>
                <Image src={third} alt="" draggable={false} />
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  );
};

export default InstallButton;
