import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';

interface ICashBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  cashAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
}

const CashBalance: React.FC<ICashBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  cashAccountId,
  account,
  link,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );

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

  return (
    <OneBalanceCard
      link={link}
      isSelected={isSelected}
      selectedAccountRef={selectedAccountRef}
      onClick={onClick}
      account={{
        institutionId: 'Cash',
        accountNumber: account.accountNumber,
        balance: balance,
        latestTransaction: lastUpdate,
        createdAt: account.createdAt,
        type: 'Cash',
        expired: false,
      }}
      optionsButton={{
        editAccount: {
          show: true,
          onClick: () => {
            console.log('edit');
          },
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

export default CashBalance;
