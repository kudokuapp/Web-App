'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Dropdown from '../Dropdown';
import SearchMerchant from '../SearchMerchant';
import type { IModalAddTransaction } from './index.d';

const ModalAddTransaction: React.FC<IModalAddTransaction> = ({
  token,
  isOpen,
  setIsOpen,
  amount,
  setAmount,
  transactionName,
  setTransactionName,
  setMerchant,
  merchantSubscription,
  getAllMerchant,
  onAddMerchant,
  setTransactionType,
  accountType,
  onSubmit,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => setIsOpen(false)}
      >
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Tambah transaksi
                </Dialog.Title>
                <div className="my-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p>Nama transaksi</p>
                    <input
                      type="text"
                      value={transactionName}
                      onChange={(e) => setTransactionName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Jumlah</p>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Merchant</p>
                    <SearchMerchant
                      token={token}
                      firstMerchant={{
                        id: '',
                        name: '',
                      }}
                      onSelectMerchant={(e) => setMerchant(e)}
                      onAddMerchant={onAddMerchant}
                      merchantSubscription={merchantSubscription}
                      getAllMerchant={getAllMerchant}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Tipe Transaksi</p>
                    <Dropdown
                      options={[
                        { value: 'INCOME', label: 'Income' },
                        { value: 'EXPENSE', label: 'Expense' },
                      ]}
                      onSelect={(v) =>
                        setTransactionType(v as 'INCOME' | 'EXPENSE')
                      }
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      onSubmit(accountType);
                    }}
                  >
                    Tambah transaksi
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

export default ModalAddTransaction;