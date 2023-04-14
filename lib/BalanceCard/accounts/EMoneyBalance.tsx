import OneBalanceCard from '$components/OneBalanceCard';
import type { IOneBalanceCard } from '$components/OneBalanceCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';

interface IEMoneyBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  eMoneyAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
}

const EMoneyBalance: React.FC<IEMoneyBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  eMoneyAccountId,
  account,
  link,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );

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
        type: 'EMoney',
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

export default EMoneyBalance;
