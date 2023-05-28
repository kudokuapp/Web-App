'use client';

import BCA from '$public/logo/bank/bca.png';
import Flazz from '$public/logo/bank/flazz.png';
import Gopay from '$public/logo/bank/gojek.png';
import { faClose, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { IModalDisconnect } from './index.d';

const ModalDisconnect: React.FC<IModalDisconnect> = ({
  isOpen,
  setIsOpen,
  handleConfirm,
  type,
  accountName,
}) => {
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
                  className="flex justify-between items-center border-b-[1px] mb-2 border-gray-600 dark:border-gray-400"
                >
                  <h3 className="text-lg font-medium leading-6 text-red-900">
                    {type === 'cash'
                      ? 'Hapus akun keuangan'
                      : 'Disconnect account'}
                  </h3>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full w-[30px] h-[30px] flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faClose} size="xl" />
                  </button>
                </Dialog.Title>

                <div className="mt-4 flex flex-col gap-8">
                  <div className="flex flex-row w-full justify-between align-middle">
                    <p className="text-onPrimaryContainer text-base">Account</p>
                    <div className="flex flex-row gap-2 align-middle">
                      {type === 'debit' ? (
                        <Image
                          src={BCA}
                          alt={`Logo BCA`}
                          width={30}
                          height={30}
                          quality={100}
                          draggable={false}
                          className="w-[30px] h-[30px]"
                        />
                      ) : type === 'emoney' ? (
                        <Image
                          src={Flazz}
                          alt={`Logo E-Money`}
                          width={30}
                          height={30}
                          quality={100}
                          draggable={false}
                          className="w-[30px] h-[30px]"
                        />
                      ) : type === 'cash' ? (
                        <FontAwesomeIcon
                          icon={faMoneyBill1Wave}
                          size="lg"
                          className="dark:text-white text-black mt-1"
                        />
                      ) : type === 'ewallet' || type === 'paylater' ? (
                        <Image
                          src={Gopay}
                          alt={`Logo E-Wallet`}
                          width={30}
                          height={30}
                          quality={100}
                          draggable={false}
                          className="w-[30px] h-[30px]"
                        />
                      ) : (
                        <></>
                      )}
                      <p className="text-onPrimaryContainer text-sm mt-1">
                        {accountName}
                      </p>
                    </div>
                  </div>

                  <p className="text-onPrimaryContainer text-xs">
                    Tindakan ini secara permanen akan menghapus akun dan seluruh
                    transaksi yang berada di akun ini.{' '}
                    <strong>Seluruh penghapusan tidak bisa dibatalkan</strong>.
                    Namun, kamu bisa connect lagi nanti
                  </p>

                  <div className="w-full h-fit flex flex-col items-center justify-end gap-4">
                    <button
                      className="px-4 py-1 text-sm font-bold w-full rounded-lg shadow-xl bg-onPrimary text-error border-2 border-error"
                      onClick={() => {
                        setIsOpen(false);
                        handleConfirm();
                      }}
                    >
                      Hapus akun keuangan ini
                    </button>
                    <button
                      className="border-2 w-full border-gray-500 px-4 py-1 text-sm rounded-lg text-onPrimaryContainer"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
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

export default ModalDisconnect;
