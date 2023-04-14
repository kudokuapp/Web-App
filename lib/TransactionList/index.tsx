'use client';

import CashTransactionList from './accounts/CashTransactionList';
import DebitTransactionList from './accounts/DebitTransactionList';
import EMoneyTransactionList from './accounts/EMoneyTransactionList';
import EWalletTransactionList from './accounts/EWalletTransactionList';
import PayLaterTransactionList from './accounts/PayLaterTransactionList';

interface Props {
  accountType: string;
  token: string;
  allTransaction:
    | IGetAllCashTransaction[]
    | IGetAllDebitTransaction[]
    | IGetAllEMoneyTransaction[]
    | IGetAllEWalletTransaction[]
    | IGetAllPayLaterTransaction[];
  id: string;
}

const TransactionList: React.FC<Props> = ({
  accountType,
  token,
  allTransaction,
  id,
}) => {
  if (accountType === 'cash') {
    const transaction = allTransaction as IGetAllCashTransaction[];
    return (
      <CashTransactionList
        cashTransactions={transaction}
        cashAccountId={id}
        token={token}
      />
    );
  } else if (accountType === 'debit') {
    const transaction = allTransaction as IGetAllDebitTransaction[];
    return (
      <DebitTransactionList
        debitTransactions={transaction}
        debitAccountId={id}
        token={token}
      />
    );
  } else if (accountType === 'ewallet') {
    const transaction = allTransaction as IGetAllEWalletTransaction[];
    return (
      <EWalletTransactionList
        eWalletTransactions={transaction}
        eWalletAccountId={id}
        token={token}
      />
    );
  } else if (accountType === 'emoney') {
    const transaction = allTransaction as IGetAllEMoneyTransaction[];
    return (
      <EMoneyTransactionList
        eMoneyTransactions={transaction}
        eMoneyAccountId={id}
        token={token}
      />
    );
  } else if (accountType === 'paylater') {
    const transaction = allTransaction as IGetAllPayLaterTransaction[];
    return (
      <PayLaterTransactionList
        payLaterTransactions={transaction}
        payLaterAccountId={id}
        token={token}
      />
    );
  } else {
    return <></>;
  }
};

export default TransactionList;
