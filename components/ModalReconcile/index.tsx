import TextInput from '$components/InputPlaceholder/TextInput';
import { useMutation } from '@apollo/client';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mutationReconcile } from 'app/[kudoku]/mutation';
import { useSearchParams } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './index.module.css';

export const ModalReconcile = ({ setIsReconcile }: { setIsReconcile: any }) => {
  const searchParamsName = useSearchParams().get('cashAccount') as string;
  const searchParamsID = useSearchParams().get('id') as string;
  const [newBalance, setNewBalance] = useState('');
  const [reconcileBalance] = useMutation(mutationReconcile, {
    variables: {
      cashAccountId: searchParamsID,
      newBalance: newBalance,
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const addTransactionCash = () => {
      return new Promise((resolve, reject) => {
        reconcileBalance()
          .then((res: any) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    toast
      .promise(addTransactionCash(), {
        loading: 'Loading...',
        success: 'Transaksi berhasil ditambahkan!',
        error: 'Transaksi gagal ditambahkan!',
      })
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <>
      <div className={styles.modalContainer}>
        <div
          className={`${styles.modalBody} bg-onPrimary relative dark:bg-onSurfaceVariant text-black dark:text-surface`}
        >
          <Toaster
            position="top-right"
            containerStyle={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
          <div className="flex px-4 flex-row justify-between items-center mb-4">
            <div className="flex flex-row gap-4">
              <h4 className="text-xl text-primary dark:text-primaryDark font-bold">
                Reconcile balance
              </h4>
            </div>
            <button onClick={() => setIsReconcile((c: any) => !c)}>x</button>
          </div>
          <div className="bg-neutralBackground px-4 flex flex-row items-center text-onSurfaceVariant gap-4 mx-4 rounded-md mb-4">
            <FontAwesomeIcon
              icon={faLightbulb}
              className="self-center my-4"
              size="xs"
            />
            <p className="text-xs">
              Reconcile balance are made so that your account balance matches
              your actual cash condition.
            </p>
          </div>
          <hr className="border-b-2" />
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-row justify-between gap-4 w-full">
                <h4 className="text-outline dark:text-surfaceVariant text-sm">
                  Account
                </h4>
                <div className="flex flex-row self-end items-center text-right">
                  <input
                    className="bg-background dark:bg-onSurfaceVariant px-2 py-1 text-right text-sm font-bold rounded"
                    type="text"
                    value={searchParamsName}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                  <div className="w-full h-fit">
                    <TextInput
                      placeholder="New balance"
                      id="newBalance"
                      onChange={(e) => {
                        setNewBalance(e.target.value);
                      }}
                      value={newBalance}
                    />
                  </div>
                </div>
                {/* <hr />
                <div className="flex flex-col justify-between gap-2 mt-2">
                  <h4 className="text-outline dark:text-surfaceVariant text-sm">
                    Notes
                  </h4>
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={2}
                    value={notes}
                    onChange={(e) => {
                      setNotes([e.target.value]);
                    }}
                    className="bg-neutralBackground dark:text-primaryContainerDark rounded-sm p-2"
                  />
                </div> */}
                <button className="w-full bg-primary hover:bg-secondary dark:bg-primaryDark dark:hover:bg-secondaryDark dark:text-primaryContainerDark text-white py-2 rounded-md my-2">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
