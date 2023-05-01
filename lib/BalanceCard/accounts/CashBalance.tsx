import DeleteModal from '$components/DeleteModal';
import ModalEditAccount from '$components/ModalEditAccount';
import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCashAccount, editCashAccount } from '../graphql/mutation';

interface ICashBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  cashAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
  token: string;
}

const CashBalance: React.FC<ICashBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  cashAccountId,
  account,
  link,
  token,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const updatedCashAccountLive = gql`
    subscription UpdatedCashAccountLive($cashAccountId: String!) {
      updatedCashAccountLive(cashAccountId: $cashAccountId) {
        balance
        lastUpdate
      }
    }
  `;

  const { data } = useSubscription(updatedCashAccountLive, {
    variables: { cashAccountId },
  });

  useEffect(() => {
    if (data) {
      setBalance(data.updatedCashAccountLive.balance);
      setLastUpdate(data.updatedCashAccountLive.lastUpdate);
    }
  }, [data]);

  const handleSubmit = (
    token: string,
    accountId: string,
    cashAccountName: string | null,
    _: string | null,
    __: string | null
  ) => {
    toast
      .promise(editCashAccount(token, accountId, cashAccountName as string), {
        loading: 'Menyimpan detil akun kamu...',
        error: 'Error menyimpan detil akun kamu!',
        success: 'Sukses menyimpan detil akun kamu!',
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <>
      <OneBalanceCard
        link={link}
        isSelected={isSelected}
        selectedAccountRef={selectedAccountRef}
        onClick={onClick}
        account={{
          institutionId: 'cash',
          accountNumber: account.accountNumber,
          balance: balance,
          latestTransaction: lastUpdate,
          createdAt: account.createdAt,
          type: 'cash',
          expired: false,
        }}
        optionsButton={{
          editAccount: {
            show: true,
            onClick: () => {
              setShowModalEdit(true);
            },
          },
          deleteAccount: {
            show: true,
            onClick: () => {
              setShowModalDelete(true);
            },
          },
        }}
      />
      <ModalEditAccount
        token={token}
        isOpen={showModalEdit}
        accountId={cashAccountId}
        setIsOpen={setShowModalEdit}
        onSubmit={handleSubmit}
        type={'cash'}
        cashOption={{ accountName: account.accountNumber }}
        eMoneyOption={null}
      />

      <DeleteModal
        isOpen={showModalDelete}
        setIsOpen={setShowModalDelete}
        handleConfirm={() => {
          toast
            .promise(deleteCashAccount(token, cashAccountId), {
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

export default CashBalance;
