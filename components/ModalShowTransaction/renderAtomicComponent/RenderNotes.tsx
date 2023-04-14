import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { IEditableTransaction } from '../index.d';

interface IRenderNotes {
  isEdit: boolean;
  data: IEditableTransaction;
  setData: Dispatch<SetStateAction<IEditableTransaction>>;
}

export const RenderNotes: React.FC<IRenderNotes> = ({
  isEdit,
  data,
  setData,
}) => {
  if (isEdit) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-onPrimaryContainer dark:text-surfaceVariant">
          Notes:
        </label>
        <motion.textarea
          className={`w-full dark:bg-background bg-onPrimaryContainer ${
            data.notes
              ? 'dark:text-onBackground text-primaryContainer'
              : 'dark:text-onBackground/70 text-primaryContainer/70'
          } rounded-md px-4 pt-4 pb-10`}
          placeholder={data.notes ?? 'Belum ada notes'}
          animate={{
            rotate: [0, -10, 10, -10, 10, -5, 5, -5, 0],
            y: [0, -10, 10, -10, 10, -5, 5, -5, 0],
          }}
          transition={{ duration: 0.5 }}
          value={data.notes ?? ''}
          onChange={(e) => {
            const newData = { ...data };
            newData.notes = e.currentTarget.value;

            setData(newData);
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-onPrimaryContainer dark:text-surfaceVariant">
          Notes
        </p>
        <p
          className={`w-full dark:bg-background bg-onPrimaryContainer ${
            data.notes
              ? 'dark:text-onBackground text-primaryContainer'
              : 'dark:text-onBackground/70 text-primaryContainer/70'
          } rounded-md px-4 pt-4 pb-10`}
        >
          {data.notes ?? 'Belum ada notes'}
        </p>
      </div>
    );
  }
};
