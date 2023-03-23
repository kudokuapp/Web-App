'use client';

import FloatingActionButton from '$components/FloatingActionButton';
import SearchMerchant from '$components/SearchMerchant';
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  addCashTransaction,
  addEMoneyTransaction,
  refreshBca,
  refreshGopayPaylater,
  refreshGopayWallet,
} from './addTransaction';

interface Props {
  token: string;
  accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney';
  accountId: string;
}

export const AddTransaction: React.FC<Props> = ({
  token,
  accountType,
  accountId,
}) => {
  const [modalAddTransactionOpen, setModalAddTransactionOpen] = useState(false);
  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState<{ name: string; id: string } | null>(
    null
  );
  const [transactionType, setTransactionType] = useState(
    '' as 'INCOME' | 'EXPENSE'
  );
  if (accountType === 'cash' || accountType === 'emoney') {
    return (
      <>
        <Toaster position="top-right" />
        <FloatingActionButton
          actions={[
            {
              icon: faPlus,
              name: 'Tambah Transaksi',
              onClick: () => setModalAddTransactionOpen(true),
              color: null,
              textColor: null,
            },
          ]}
        />

        <Transition appear show={modalAddTransactionOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-20"
            onClose={() => setModalAddTransactionOpen(false)}
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
                          if (accountType === 'cash') {
                            toast
                              .promise(
                                addCashTransaction({
                                  token,
                                  cashAccountId: accountId,
                                  transactionName,
                                  amount,
                                  merchantId:
                                    merchant && transactionType === 'EXPENSE'
                                      ? merchant.id
                                      : '6414a1e910657b29b4ffbaf9',
                                  category: [
                                    { name: 'UNDEFINED', amount: amount },
                                  ],
                                  notes: null,
                                  transactionType,
                                }),
                                {
                                  loading: 'Tambah transaksi...',
                                  success: 'Sukses',
                                  error: 'Gagal',
                                }
                              )
                              .then(() => {
                                window.location.reload();
                              });
                          }

                          if (accountType === 'emoney') {
                            toast
                              .promise(
                                addEMoneyTransaction({
                                  token,
                                  eMoneyAccountId: accountId,
                                  transactionName,
                                  amount,
                                  merchantId:
                                    merchant && transactionType === 'EXPENSE'
                                      ? merchant.id
                                      : '6414a1e910657b29b4ffbaf9',
                                  category: [
                                    { name: 'UNDEFINED', amount: amount },
                                  ],
                                  notes: null,
                                  transactionType,
                                  institutionId: '6408f95f1ff428549fc7cbe4',
                                }),
                                {
                                  loading: 'Tambah transaksi...',
                                  success: 'Sukses',
                                  error: 'Gagal',
                                }
                              )
                              .then(() => {
                                window.location.reload();
                              });
                          }
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
      </>
    );
  } else if (accountType === 'debit') {
    return (
      <>
        <Toaster position="top-right" />
        <FloatingActionButton
          actions={[
            {
              icon: faRefresh,
              name: 'Refresh Transaksi',
              onClick: () => {
                toast
                  .promise(refreshBca({ token, debitAccountId: accountId }), {
                    loading: 'Refresh transaksi...',
                    success: 'Sukses!',
                    error: 'Gagal!',
                  })
                  .then(() => window.location.reload());
              },
              color: null,
              textColor: null,
            },
          ]}
        />
      </>
    );
  } else if (accountType === 'ewallet') {
    return (
      <>
        <Toaster position="top-right" />
        <FloatingActionButton
          actions={[
            {
              icon: faRefresh,
              name: 'Refresh Transaksi',
              onClick: () => {
                toast
                  .promise(
                    refreshGopayWallet({ token, eWalletAccountId: accountId }),
                    {
                      loading: 'Refresh transaksi...',
                      success: 'Sukses!',
                      error: 'Gagal!',
                    }
                  )
                  .then(() => window.location.reload());
              },
              color: null,
              textColor: null,
            },
          ]}
        />
      </>
    );
  } else if (accountType === 'paylater') {
    return (
      <>
        <Toaster position="top-right" />
        <FloatingActionButton
          actions={[
            {
              icon: faRefresh,
              name: 'Refresh Transaksi',
              onClick: () => {
                toast
                  .promise(
                    refreshGopayPaylater({
                      token,
                      payLaterAccountId: accountId,
                    }),
                    {
                      loading: 'Refresh transaksi...',
                      success: 'Sukses!',
                      error: 'Gagal!',
                    }
                  )
                  .then(() => window.location.reload());
              },
              color: null,
              textColor: null,
            },
          ]}
        />
      </>
    );
  } else {
    return <></>;
  }
};

interface DropdownProps {
  options: { value: string; label: string }[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
