import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import IndividualCard, { IIndividualCard } from '../atomic/IndividualCard';

interface ICashBalance {
  isSelected: IIndividualCard['isSelected'];
  selectedAccountRef: IIndividualCard['selectedAccountRef'];
  onClick: IIndividualCard['onClick'];
  cashAccountId: string;
  account: IIndividualCard['account'];
  link: IIndividualCard['link'];
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
    <IndividualCard
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
