import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export const UseChromeModal = ({
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
