'use client';

import AreYouSureModal from '$components/AreYouSureModal';
import { faClose, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { IModalReconcileBalance } from './index.d';

const ModalReconcileBalance: React.FC<IModalReconcileBalance> = ({
  token,
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const [amount, setAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('Rp 0');
  const [areYouSureModal, setAreYouSureModal] = useState(false);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center border-b-2 border-blue-400 pb-2"
                  >
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Reconcile balance
                    </h3>

                    <button
                      onClick={() => {
                        if (!amount) {
                          setIsOpen(false);
                        } else {
                          setAreYouSureModal(true);
                        }
                      }}
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faClose} size="xl" />
                    </button>
                  </Dialog.Title>
                  <div className="my-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-0">
                      <p className="text-sm text-onPrimaryContainer">
                        Balance baru
                      </p>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="1200000"
                        className="p-2 rounded-md shadow-lg text-sm"
                        onKeyDown={(
                          event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          const { key } = event;
                          const value = (event.target as HTMLInputElement)
                            .value;
                          const isNumber = /[0-9]/.test(key);
                          const isComma = /[,]/.test(key);
                          const isBackspace = key === 'Backspace';
                          const isDelete = key === 'Delete';
                          const isArrowLeft = key === 'ArrowLeft';
                          const isArrowRight = key === 'ArrowRight';
                          const isHome = key === 'Home';
                          const isEnd = key === 'End';
                          const hasComma = value.indexOf(',') !== -1;

                          if (
                            (!isNumber &&
                              !isComma &&
                              !isBackspace &&
                              !isDelete &&
                              !isArrowLeft &&
                              !isArrowRight &&
                              !isHome &&
                              !isEnd) ||
                            (isComma && hasComma)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        onKeyUp={() => {
                          setDisplayAmount(
                            amount === ''
                              ? 'Rp 0'
                              : new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                }).format(Number(amount.replace(',', '.')))
                          );
                        }}
                      />
                      <p className="text-sm text-primary">{displayAmount}</p>
                    </div>
                  </div>

                  <div className="bg-neutralBackground px-4 flex flex-row items-center w-full h-fit text-onSurfaceVariant gap-4 rounded-md">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="self-center my-4"
                      size="xs"
                    />
                    <p className="text-xs">
                      Tip: Reconcile balance buat kamu yang udah lama gak
                      nyatet!
                    </p>
                  </div>

                  <div className="mt-20 w-full flex gap-4 items-center justify-end">
                    <button
                      className="border border-gray-500 px-4 py-2 rounded-lg text-onPrimaryContainer text-sm font-medium"
                      onClick={() => {
                        if (!amount) {
                          setIsOpen(false);
                        } else {
                          setAreYouSureModal(true);
                        }
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-onPrimary hover:bg-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-primary/50 disabled:cursor-not-allowed"
                      onClick={() => {
                        onSubmit(token, amount.replace(',', '.'));
                        setAmount('');
                        setDisplayAmount('Rp 0');
                        setIsOpen(false);
                      }}
                      disabled={!amount}
                    >
                      Reconcile
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <AreYouSureModal
        isOpen={areYouSureModal}
        setIsOpen={setAreYouSureModal}
        handleConfirm={() => {
          setAmount('');
          setDisplayAmount('Rp 0');
          setAreYouSureModal(false);
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default ModalReconcileBalance;
