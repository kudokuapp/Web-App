'use client';

import AreYouSureModal from '$components/AreYouSureModal';
import {
  EMoneyInstitutionId,
  institutionIdList,
} from '$lib/ModalAddFinancialAccount/atomic/EMoney/EMoneyInstitutionId';
import { faClose, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { IModalEditAccount } from './index.d';

const ModalEditAccount: React.FC<IModalEditAccount> = ({
  token,
  isOpen,
  setIsOpen,
  onSubmit,
  type,
  accountId,
  cashOption,
  eMoneyOption,
}) => {
  const [cashAccountName, setCashAccountName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [institutionId, setInstitutionId] = useState('');
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
                      Edit akun {type === 'emoney' ? 'e-money' : 'cash'} kamu
                    </h3>

                    <button
                      onClick={() => {
                        if (!cashAccountName && !cardNumber && !institutionId) {
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

                  {type === 'cash' && cashOption !== null && (
                    <>
                      <div className="my-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-onPrimaryContainer">
                            Nama akun
                          </p>
                          <input
                            type="text"
                            value={cashAccountName}
                            onChange={(e) => setCashAccountName(e.target.value)}
                            placeholder={cashOption.accountName}
                            className="p-2 rounded-md shadow-lg text-sm"
                          />
                        </div>
                      </div>

                      <div className="bg-neutralBackground px-4 flex flex-row items-center w-full h-fit text-onSurfaceVariant gap-4 rounded-md">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className="self-center my-4"
                          size="xs"
                        />
                        <p className="text-xs">
                          Tip: Pake nama akun yang bisa kamu kenali!
                        </p>
                      </div>
                    </>
                  )}

                  {type === 'emoney' && eMoneyOption !== null && (
                    <>
                      <div className="my-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-0">
                          <p className="text-sm text-onPrimaryContainer">
                            Nomor kartu e-money
                          </p>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder={eMoneyOption.cardNumber}
                            className="p-2 rounded-md shadow-lg text-sm"
                          />
                        </div>

                        <EMoneyInstitutionId
                          institutionIdIndex={institutionIdList.findIndex(
                            ({ mongoDbId }) =>
                              mongoDbId === eMoneyOption.institutionId
                          )}
                          setInstitutionId={setInstitutionId}
                        />
                      </div>

                      <div className="bg-neutralBackground px-4 flex flex-row items-center w-full h-fit text-onSurfaceVariant gap-4 rounded-md">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className="self-center my-4"
                          size="xs"
                        />
                        <p className="text-xs">
                          Tip: Kalo gatau nomor kartu e-money, coba cek belakang
                          kartu atau via NFC hp-mu!
                        </p>
                      </div>
                    </>
                  )}

                  <div className="mt-20 w-full flex gap-4 items-center justify-end">
                    <button
                      className="border border-gray-500 px-4 py-2 rounded-lg text-onPrimaryContainer text-sm font-medium"
                      onClick={() => {
                        if (!cashAccountName && !cardNumber && !institutionId) {
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
                        onSubmit(
                          token,
                          accountId,
                          cashAccountName !== '' ? cashAccountName : null,
                          cardNumber !== '' ? cardNumber : null,
                          institutionId !== '' ? institutionId : null
                        );
                        setCashAccountName('');
                        setCardNumber('');
                        setInstitutionId('');
                        setIsOpen(false);
                      }}
                      disabled={
                        type === 'cash'
                          ? !cashAccountName
                          : !cardNumber || !institutionId
                      }
                    >
                      Save
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
          setCashAccountName('');
          setCardNumber('');
          setInstitutionId('');
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default ModalEditAccount;
