'use client';

import FloatingActionButton from '$components/FloatingActionButton';
import ModalAddTransaction from '$components/ModalAddTransaction';
import { IMerchant } from '$components/SearchMerchant/index.d';
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { NameAmount } from 'global';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  addCashTransaction,
  addEMoneyTransaction,
  addMerchant,
} from './graphql/mutation';
import { getAllMerchant } from './graphql/query';
import { merchantSubscription } from './graphql/subscription';
import { IFAB } from './index.d';

export const FAB: React.FC<IFAB> = ({
  token,
  accountType,
  accountId,
  institutionId,
}) => {
  const [modalAddTransactionOpen, setModalAddTransactionOpen] = useState(false);

  const handleSubmitTransaction = (
    _token: string,
    _accountId: string,
    accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney',
    _transactionType: string,
    _transactionName: string,
    _transactionAmount: string,
    _category: NameAmount[],
    _merchant: IMerchant,
    _institutionId: string
  ) => {
    if (accountType === 'cash') {
      toast.promise(
        addCashTransaction(
          _token,
          _accountId,
          accountType,
          _transactionType,
          _transactionName,
          _transactionAmount,
          _category,
          _merchant,
          'cash'
        ),
        {
          loading: 'Lagi nambahin transaksimu...',
          success: 'Sukses menambahkan transaksi!',
          error: 'Error menambahkan transaksi!',
        }
      );
    } else if (accountType === 'emoney') {
      toast.promise(
        addEMoneyTransaction(
          _token,
          _accountId,
          accountType,
          _transactionType,
          _transactionName,
          _transactionAmount,
          _category,
          _merchant,
          institutionId
        ),
        {
          loading: 'Lagi nambahin transaksimu...',
          success: 'Sukses menambahkan transaksi!',
          error: 'Error menambahkan transaksi!',
        }
      );
    }
  };

  if (accountType === 'cash') {
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
          accountId={accountId}
          isOpen={modalAddTransactionOpen}
          setIsOpen={setModalAddTransactionOpen}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
          accountType={'cash'}
          onSubmit={handleSubmitTransaction}
          institutionId={'cash'}
        />
      </>
    );
  } else if (accountType === 'emoney') {
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
          accountId={accountId}
          isOpen={modalAddTransactionOpen}
          setIsOpen={setModalAddTransactionOpen}
          onAddMerchant={addMerchant}
          merchantSubscription={merchantSubscription}
          getAllMerchant={getAllMerchant}
          accountType={'emoney'}
          onSubmit={handleSubmitTransaction}
          institutionId={institutionId}
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
