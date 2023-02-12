import TextInput from '$components/InputPlaceholder/TextInput';
import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';

export const ModalAddTransaction = ({
  setIsAddTransaction,
}: {
  setIsAddTransaction: any;
}) => {
  const searchParamsName = useSearchParams().get('cashAccount');
  return (
    <>
      <div className={styles.modalContainer}>
        <div
          className={`${styles.modalBody} bg-onPrimary dark:bg-onSurfaceVariant text-black dark:text-surface`}
        >
          <div className="flex px-4 flex-row justify-between items-center mb-4">
            <div className="flex flex-row gap-4">
              <h4 className="text-xl text-primary dark:text-primaryDark font-bold">
                Add Transaction
              </h4>
            </div>
            <button onClick={() => setIsAddTransaction((c: any) => !c)}>
              x
            </button>
          </div>
          <hr className="border-b-2" />
          <div className={styles.modalContent}>
            <div className="flex flex-row justify-start gap-4 w-full">
              <div className="flex flex-col justify-start">
                <h4 className="text-outline dark:text-surfaceVariant text-sm">
                  Account
                </h4>
                <h4 className="bg-background dark:bg-outline px-2 py-1 text-sm rounded">
                  {searchParamsName}
                </h4>
              </div>
              <div className="flex flex-col justify-start">
                <h4 className="text-outline dark:text-surfaceVariant text-sm">
                  Transaction Type
                </h4>
                <select className="bg-background dark:bg-outline px-2 py-1 text-sm rounded">
                  <option className="px-2 py-1" value="OUT">
                    Expense
                  </option>
                  <option value="IN">Income</option>
                </select>
              </div>
            </div>
            <div>
              <form className="flex flex-col gap-2">
                <div className="flex flex-row gap-4">
                  <div className="w-3/4 h-fit">
                    <TextInput
                      placeholder="Transaction name"
                      id="transactionName"
                    />
                  </div>
                  <div className="w-1/4 h-fit">
                    <TextInput placeholder="Nominal" id="nominal" />
                  </div>
                </div>
                <div className="flex flex-col w-fit justify-start mt-2">
                  <h4 className="text-outline dark:text-surfaceVariant text-sm">
                    Category
                  </h4>
                  <select className="bg-background dark:bg-outline px-2 py-1 text-sm rounded">
                    <option className="px-2 py-1" value="OUT">
                      Expense
                    </option>
                    <option value="IN">Income</option>
                  </select>
                </div>
                {/* <div className="flex flex-col w-full mb-2 justify-start">
                  <TextInput placeholder="Add Merchant" id="merchant" />
                </div> */}
                <hr />
                <div className="flex flex-col justify-between gap-2 mt-2">
                  <h4 className="text-outline text-sm">Notes</h4>
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={2}
                    className="bg-neutralBackground dark:text-primaryContainerDark rounded-sm p-2"
                  />
                </div>
                <button className="w-full bg-primary hover:bg-secondary dark:bg-primaryDark dark:hover:bg-secondaryDark dark:text-primaryContainerDark text-white py-2 rounded-md my-2">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
