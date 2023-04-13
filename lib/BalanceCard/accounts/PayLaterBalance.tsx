import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import OneBalanceCard from '../../../components/OneBalanceCard';
import type { IOneBalanceCard } from '../../../components/OneBalanceCard/index.d';

interface IPayLaterBalance {
  isSelected: IOneBalanceCard['isSelected'];
  selectedAccountRef: IOneBalanceCard['selectedAccountRef'];
  onClick: IOneBalanceCard['onClick'];
  payLaterAccountId: string;
  account: IOneBalanceCard['account'];
  link: IOneBalanceCard['link'];
}

const PayLaterBalance: React.FC<IPayLaterBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  payLaterAccountId,
  account,
  link,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );
  const [expired, setExpired] = useState<boolean>(account.expired);

  const updatedPayLaterAccountLive = gql`
    subscription UpdatedPayLaterAccountLive($payLaterAccountId: String!) {
      updatedPayLaterAccountLive(payLaterAccountId: $payLaterAccountId) {
        expired
        lastUpdate
        balance
      }
    }
  `;

  const { data } = useSubscription(updatedPayLaterAccountLive, {
    variables: { payLaterAccountId },
  });

  useEffect(() => {
    if (data) {
      setBalance(data.updatedPayLaterAccountLive.balance);
      setLastUpdate(data.updatedPayLaterAccountLive.lastUpdate);
      setExpired(data.updatedPayLaterAccountLive.expired);
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
        expired: expired,
        type: 'PayLater',
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

export default PayLaterBalance;
