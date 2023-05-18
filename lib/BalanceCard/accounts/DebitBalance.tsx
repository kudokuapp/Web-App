import ModalDisconnect from '$components/ModalDisconnect';
import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteDebitAccount } from '../graphql/mutation';

interface IDebitBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  debitAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
  token: string;
}

const DebitBalance: React.FC<IDebitBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  debitAccountId,
  account,
  link,
  token,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );
  const [expired, setExpired] = useState<boolean>(account.expired);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const updatedDebitAccountLive = gql`
    subscription UpdatedDebitAccountLive($debitAccountId: String!) {
      updatedDebitAccountLive(debitAccountId: $debitAccountId) {
        balance
        lastUpdate
        expired
      }
    }
  `;

  const { data } = useSubscription(updatedDebitAccountLive, {
    variables: { debitAccountId },
  });

  useEffect(() => {
    if (data) {
      setBalance(data.updatedDebitAccountLive.balance);
      setLastUpdate(data.updatedDebitAccountLive.lastUpdate);
      setExpired(data.updatedDebitAccountLive.expired);
    }
  }, [data]);

  return (
    <>
      <OneBalanceCard
        link={link}
        isSelected={isSelected}
        selectedAccountRef={selectedAccountRef}
        onClick={onClick}
        account={{
          institutionId: account.institutionId,
          accountNumber: account.accountNumber,
          balance: balance,
          latestTransaction: lastUpdate,
          createdAt: account.createdAt,
          type: 'debit',
          expired: expired,
        }}
        optionsButton={{
          editAccount: {
            show: false,
            onClick: () => {},
          },
          deleteAccount: {
            show: true,
            onClick: () => {
              setShowModalDelete(true);
            },
          },
        }}
      />

      <ModalDisconnect
        isOpen={showModalDelete}
        setIsOpen={setShowModalDelete}
        accountName={account.accountNumber}
        type="debit"
        handleConfirm={() => {
          toast
            .promise(deleteDebitAccount(token, debitAccountId), {
              loading: 'Lagi delete akun dan transaksi kamu...',
              success: 'Sukses delete akun dan transaksi kamu!',
              error: 'Error delete akun dan transaksi kamu!',
            })
            .then(() => {
              window.location.reload();
            });
        }}
      />
    </>
  );
};

export default DebitBalance;
