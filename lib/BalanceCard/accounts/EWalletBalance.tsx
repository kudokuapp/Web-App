import ModalDisconnect from '$components/ModalDisconnect';
import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteGopayAccount } from '../graphql/mutation';

interface IEWalletBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  eWalletAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
  token: string;
}

const EWalletBalance: React.FC<IEWalletBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  eWalletAccountId,
  account,
  link,
  token,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );
  const [expired, setExpired] = useState<boolean>(account.expired);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updatedEWalletAccountLive = gql`
    subscription UpdatedEWalletAccountLive($eWalletAccountId: String!) {
      updatedEWalletAccountLive(eWalletAccountId: $eWalletAccountId) {
        lastUpdate
        expired
        balance
      }
    }
  `;

  const { data } = useSubscription(updatedEWalletAccountLive, {
    variables: { eWalletAccountId },
  });

  useEffect(() => {
    if (data) {
      setBalance(data.updatedEWalletAccountLive.balance);
      setLastUpdate(data.updatedEWalletAccountLive.lastUpdate);
      setExpired(data.updatedEWalletAccountLive.expired);
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
          type: 'ewallet',
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
              setShowDeleteModal(true);
            },
          },
        }}
      />
      <ModalDisconnect
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        accountName={account.accountNumber}
        type="ewallet"
        handleConfirm={() => {
          if (account.institutionId === '63d94170d3e050940af0caf2') {
            toast
              .promise(deleteGopayAccount(token, eWalletAccountId), {
                loading: 'Lagi delete akun dan transaksi kamu...',
                success: 'Sukses delete akun dan transaksi kamu!',
                error: 'Error delete akun dan transaksi kamu!',
              })
              .then(() => {
                window.location.reload();
              });
          }
        }}
      />
    </>
  );
};

export default EWalletBalance;
