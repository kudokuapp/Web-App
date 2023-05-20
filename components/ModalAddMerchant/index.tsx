import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import type { IModalAddMerchant } from './index.d';

const ModalAddMerchant: React.FC<IModalAddMerchant> = ({
  isOpen,
  setIsOpen,
  query,
  setQuery,
  urlMerchant,
  setUrlMerchant,
  onAddMerchant,
  setShowAddMerchant,
  onSelectMerchant,
  handleSelectMerchant,
  token,
}) => {
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
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
                    Tambah merchant
                  </Dialog.Title>
                  <div className="my-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="nama-merchant">Nama merchant</label>
                      <input
                        type="text"
                        id="nama-merchant"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="url-merchant">URL merchant</label>
                      <input
                        type="text"
                        id="url-merchant"
                        value={urlMerchant}
                        onChange={(e) => setUrlMerchant(e.target.value)}
                        placeholder={`https://${query.toLowerCase()}.co.id`}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        toast
                          .promise(onAddMerchant(token, query, urlMerchant), {
                            loading: 'Menambahkan merchant...',
                            success: 'Sukses Menambahkan merchant!',
                            error: 'Gagal Menambahkan merchant!',
                          })
                          .then(() => {
                            setIsOpen(false),
                              setUrlMerchant(''),
                              setShowAddMerchant(false);
                            onSelectMerchant(query);
                          });
                      }}
                    >
                      Tambah merchant
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
};

export default ModalAddMerchant;
