import ModalDisconnect from '$components/ModalDisconnect';
import ModalEditAccount from '$components/ModalEditAccount';
import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteEMoneyAccount, editEMoneyAccount } from '../graphql/mutation';

interface IEMoneyBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  eMoneyAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
  token: string;
}

const EMoneyBalance: React.FC<IEMoneyBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  eMoneyAccountId,
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

  const updatedEMoneyAccountLive = gql`
    subscription UpdatedEMoneyAccountLive($eMoneyAccountId: String!) {
      updatedEMoneyAccountLive(eMoneyAccountId: $eMoneyAccountId) {
        balance
        lastUpdate
      }
    }
  `;

  const { data } = useSubscription(updatedEMoneyAccountLive, {
    variables: { eMoneyAccountId },
  });

  useEffect(() => {
    if (data) {
      setBalance(data.updatedEMoneyAccountLive.balance);
      setLastUpdate(data.updatedEMoneyAccountLive.lastUpdate);
    }
  }, [data]);

  const handleSubmit = (
    token: string,
    accountId: string,
    _: string | null,
    eMoneyCardNumber: string | null,
    eMoneyInstitutionId: string | null
  ) => {
    toast
      .promise(
        editEMoneyAccount(
          token,
          accountId,
          eMoneyCardNumber,
          eMoneyInstitutionId
        ),
        {
          loading: 'Menyimpan detil akun kamu...',
          error: 'Error menyimpan detil akun kamu!',
          success: 'Sukses menyimpan detil akun kamu!',
        }
      )
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
          institutionId: account.institutionId,
          accountNumber: account.accountNumber,
          balance: balance,
          latestTransaction: lastUpdate,
          createdAt: account.createdAt,
          type: 'emoney',
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
        accountId={eMoneyAccountId}
        setIsOpen={setShowModalEdit}
        onSubmit={handleSubmit}
        type={'emoney'}
        cashOption={null}
        eMoneyOption={{
          cardNumber: account.accountNumber,
          institutionId: account.institutionId,
        }}
      />

      <ModalDisconnect
        isOpen={showModalDelete}
        setIsOpen={setShowModalDelete}
        accountName={account.accountNumber}
        type="emoney"
        handleConfirm={() => {
          toast
            .promise(deleteEMoneyAccount(token, eMoneyAccountId), {
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

export default EMoneyBalance;
