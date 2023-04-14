import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';

interface IDebitBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  debitAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
}

const DebitBalance: React.FC<IDebitBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  debitAccountId,
  account,
  link,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );
  const [expired, setExpired] = useState<boolean>(account.expired);

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
        type: 'Debit',
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
            console.log('delete');
          },
        },
      }}
    />
  );
};

export default DebitBalance;
