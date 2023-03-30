import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import IndividualCard, { IIndividualCard } from '../atomic/IndividualCard';

interface IPayLaterBalance {
  isSelected: IIndividualCard['isSelected'];
  selectedAccountRef: IIndividualCard['selectedAccountRef'];
  onClick: IIndividualCard['onClick'];
  payLaterAccountId: string;
  account: IIndividualCard['account'];
  link: IIndividualCard['link'];
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
    <IndividualCard
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
