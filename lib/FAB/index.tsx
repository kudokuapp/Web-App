'use client';

import FloatingActionButton from '$components/FloatingActionButton';
import ModalAddTransaction from '$components/ModalAddTransaction';
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { addMerchant } from './graphql/mutation';
import { getAllMerchant } from './graphql/query';
import { merchantSubscription } from './graphql/subscription';
import { IFAB } from './index.d';

export const FAB: React.FC<IFAB> = ({ token, accountType, accountId }) => {
  const [modalAddTransactionOpen, setModalAddTransactionOpen] = useState(false);
  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState<{ name: string; id: string } | null>(
    null
  );
  const [transactionType, setTranssactionType] = useState<string>(
    '' as 'INCOME' | 'EXPENSE'
  );
  if (accountType === 'cash' || accountType === 'emoney') {
    return (
      <>
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

        <ModalAddTransaction
          token={token}
          isOpen={modalAddTransactionOpen}
          setIsOpen={setModalAddTransactionOpen}
          amount={amount}
          setAmount={setAmount}
          transactionName={transactionName}
          setTransactionName={setTransactionName}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
          setMerchant={setMerchant}
          setTransactionType={setTransactionType}
          accountType={'cash'}
          onSubmit={function (
            accountType: 'cash' | 'debit' | 'ewallet' | 'emoney' | 'paylater'
          ): Promise<any> {
            throw new Error('Function not implemented.');
          }}
        />
      </>
    );
  } else if (accountType === 'debit') {
    return (
      <>
        <FloatingActionButton
          actions={[
            {
              icon: faRefresh,
              name: 'Refresh Transaksi',
              onClick: () => {
                // toast
                //   .promise(refreshBca({ token, debitAccountId: accountId }), {
                //     loading: 'Refresh transaksi...',
                //     success: 'Sukses!',
                //     error: 'Gagal!',
                //   })
                //   .then(() => window.location.reload());
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
        <FloatingActionButton
          actions={[
            {
              icon: faRefresh,
              name: 'Refresh Transaksi',
              onClick: () => {
                // toast
                //   .promise(
                //     refreshGopayWallet({ token, eWalletAccountId: accountId }),
                //     {
                //       loading: 'Refresh transaksi...',
                //       success: 'Sukses!',
                //       error: 'Gagal!',
                //     }
                //   )
                //   .then(() => window.location.reload());
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
        <FloatingActionButton
          actions={[
            {
              icon: faRefresh,
              name: 'Refresh Transaksi',
              onClick: () => {
                // toast
                //   .promise(
                //     refreshGopayPaylater({
                //       token,
                //       payLaterAccountId: accountId,
                //     }),
                //     {
                //       loading: 'Refresh transaksi...',
                //       success: 'Sukses!',
                //       error: 'Gagal!',
                //     }
                //   )
                //   .then(() => window.location.reload());
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
