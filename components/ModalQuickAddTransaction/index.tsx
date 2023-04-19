'use client';

import { QuickAddExpense } from './atomic/QuickAddExpense';
import { QuickAddIncome } from './atomic/QuickAddIncome';
import type { IModalQuickAddTransaction } from './index.d';

const ModalQuickAddTransaction: React.FC<IModalQuickAddTransaction> = ({
  token,
  isOpen,
  setIsOpen,
  onSubmit,
  type,
}) => {
  if (type === 'EXPENSE') {
    return (
      <QuickAddExpense
        token={token}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
      />
    );
  } else if (type === 'INCOME') {
    return (
      <QuickAddIncome
        token={token}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
      />
    );
  } else {
    return <></>;
  }
};

export default ModalQuickAddTransaction;
