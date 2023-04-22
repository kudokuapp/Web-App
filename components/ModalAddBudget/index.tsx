'use client';

import AreYouSureModal from '$components/AreYouSureModal';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { addBudgeting } from 'app/kudoku/budgeting/graphql_/mutation/addBudgeting';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import Dropdown from '../Dropdown';
import { SuccessBudget } from './atomic/success';
import type { IModalAddBudgeting } from './index.d';

const ModalAddBudgeting: React.FC<IModalAddBudgeting> = ({
  token,
  isOpen,
  setIsOpen,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [BudgetName, setBudgetName] = useState<string>('');
  const [BudgetType, setBudgetType] = useState<string>('MONTHLY');
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [displayAmount, setDisplayAmount] = useState('Rp 0');

  const renderDisabled = () => {
    if (BudgetType === 'MONTHLY') {
      const disabled =
        !BudgetName || BudgetName === '' || !amount || amount === '';
      return disabled;
    } else {
      const disabled =
        !BudgetName || BudgetName === '' || !amount || amount === '';
      return disabled;
    }
  };

  const handleSubmitTransaction = () => {
    (async () => {
      try {
        await toast.promise(
          addBudgeting({
            token: token,
            budgetName: BudgetName,
            amount: amount,
            budgetTypeId: BudgetType,
          }),
          {
            loading: 'Lagi nambahin transaksimu...',
            success: 'Sukses menambahkan transaksi!',
            error: 'Error menambahkan transaksi!',
          }
        );
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    })();
  };
  switch (success) {
    case false:
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
                          Tambah rencana budget
                        </h3>

                        <button
                          onClick={() => {
                            if (!amount && !BudgetName) {
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
                            Tipe Transaksi
                          </p>
                          <Dropdown
                            options={[
                              { value: 'MONTHLY', label: 'Budget bulanan' },
                              { value: 'CUSTOM', label: 'Budget custom' },
                            ]}
                            onSelect={(v) => {
                              setBudgetType(v as 'MONTHLY' | 'CUSTOM');
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-onPrimaryContainer">
                            Jumlah
                          </p>
                          <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={
                              BudgetType === 'MONTHLY' ? '20000' : '15000000'
                            }
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
                          <p className="text-sm text-primary">
                            {displayAmount}
                          </p>
                        </div>

                        {BudgetType === 'MONTHLY' && (
                          <>
                            <div className="flex flex-col gap-0">
                              <p className="text-sm text-onPrimaryContainer">
                                Nama budget
                              </p>
                              <select
                                name=""
                                id=""
                                className="p-2 rounded-md shadow-lg text-sm"
                                value={BudgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                              >
                                <option value="Januari">Januari</option>
                                <option value="Febuari">Febuari</option>
                                <option value="Maret">Maret</option>
                                <option value="April">April</option>
                                <option value="Mei">Mei</option>
                                <option value="Juni">Juni</option>
                                <option value="Juli">Juli</option>
                                <option value="Agustus">Agustus</option>
                                <option value="September">September</option>
                                <option value="Oktober">Oktober</option>
                                <option value="November">November</option>
                                <option value="Desember">Desember</option>
                              </select>
                            </div>
                          </>
                        )}

                        {BudgetType === 'CUSTOM' && (
                          <>
                            <div className="flex flex-col gap-0">
                              <p className="text-sm text-onPrimaryContainer">
                                Nama budget
                              </p>
                              <input
                                type="text"
                                value={BudgetName}
                                onChange={(e) => setBudgetName(e.target.value)}
                                className="p-2 rounded-md shadow-lg text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mt-20 w-full flex gap-4 items-center justify-end">
                        <button
                          className="border border-gray-500 px-4 py-2 rounded-lg text-onPrimaryContainer text-sm font-medium"
                          onClick={() => {
                            if (!amount && !BudgetName) {
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
                            handleSubmitTransaction();
                          }}
                          disabled={renderDisabled()}
                        >
                          Tambah budget
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
              setBudgetType('');
              setBudgetName('');
              setAmount('');
              setDisplayAmount('Rp 0');
              setAreYouSureModal(false);
              setIsOpen(false);
            }}
          />
        </>
      );
    case true:
      return (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[100000000000] select-none"
            onClose={() => {
              return;
            }}
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
              <div className="fixed inset-0 bg-background dark:bg-onBackground bg-opacity-70 dark:bg-opacity-70" />
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-onPrimary dark:bg-onSurfaceVariant p-6 text-left align-middle shadow-xl transition-all">
                    <section className="mt-10">
                      <SuccessBudget
                        onClick={() => {
                          setBudgetType('');
                          setBudgetName('');
                          setAmount('');
                          setDisplayAmount('Rp 0');
                          setAreYouSureModal(false);
                          setIsOpen(false);
                        }}
                      />
                    </section>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      );
  }
};

export default ModalAddBudgeting;
