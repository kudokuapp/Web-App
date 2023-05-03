'use client';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { IAreYouSureModal } from './index.d';

const AreYouSureModal: React.FC<IAreYouSureModal> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
}) => {
  useEffect(() => {
    // set overflow to auto when modal is closed
    if (!isOpen) {
      document.documentElement.removeAttribute('style');
    }

    // cleanup effect to reset overflow to default when component is unmounted
    return () => {
      document.documentElement.removeAttribute('style');
    };
  }, [isOpen]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex justify-between items-center"
                >
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Yakin mau nge-close?
                  </h3>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full w-[30px] h-[30px] flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faClose} size="xl" />
                  </button>
                </Dialog.Title>

                <div className="mt-4 flex flex-col gap-8">
                  <p className="text-onPrimaryContainer text-base">
                    Kalo kamu keluar, transaksi kamu gak ke save loh!
                  </p>

                  <div className="w-full h-fit flex items-center justify-end gap-4">
                    <button
                      className="border-2 border-gray-500 px-4 py-2 rounded-lg text-onPrimaryContainer"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg shadow-xl bg-error text-onError border-2 border-error"
                      onClick={() => {
                        setIsOpen(false);
                        handleConfirm();
                      }}
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AreYouSureModal;
