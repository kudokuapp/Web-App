import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import RenderMerchantImage from '../../RenderMerchantImage';
import { IEditableTransaction } from '../index.d';

interface IRenderTransactionName {
  data: IEditableTransaction;
  setData: Dispatch<SetStateAction<IEditableTransaction>>;
  isEdit: boolean;
  isMerchantName: boolean;
  setIsMerchantName: Dispatch<SetStateAction<boolean>>;
}

export const RenderTransactionName: React.FC<IRenderTransactionName> = ({
  data,
  setData,
  isEdit,
  isMerchantName,
  setIsMerchantName,
}) => {
  if (isEdit) {
    return (
      <>
        <div className="flex flex-col">
          <motion.input
            type="text"
            placeholder={
              isMerchantName ? data.merchantName : data.transactionName
            }
            onChange={(e) => {
              const newData = { ...data };

              newData.transactionName = e.currentTarget.value;

              if (e.currentTarget.value === data.merchantName) {
                setIsMerchantName(true);
              }

              if (e.currentTarget.value !== data.merchantName) {
                setIsMerchantName(false);
              }

              setData({ ...newData });
            }}
            className="px-4 py-1 rounded-md font-medium text-lg"
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.label
            className="flex items-start justify-start gap-2"
            animate={{
              rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
              y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="checkbox"
              checked={isMerchantName}
              onChange={() => {
                setIsMerchantName(!isMerchantName);
              }}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-md"
            />
            <span className="text-onPrimaryContainer dark:text-surfaceVariant max-w-[300px]">
              Nama transaksi sama dengan nama merchant
            </span>
          </motion.label>
        </div>
      </>
    );
  } else {
    if (isMerchantName) {
      return (
        <div className="flex gap-2 items-center justify-start">
          <RenderMerchantImage
            merchantId={data.merchantId}
            merchantName={data.merchantName}
            size={40}
          />
          <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xl">
            {data.merchantName}
          </p>
        </div>
      );
    } else {
      return (
        <p className="text-onPrimaryContainer dark:text-surfaceVariant font-medium text-lg">
          {data.transactionName}
        </p>
      );
    }
  }
};
