import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import IndividualCard, { IIndividualCard } from '../atomic/IndividualCard';

interface IEWalletBalance {
  isSelected: IIndividualCard['isSelected'];
  selectedAccountRef: IIndividualCard['selectedAccountRef'];
  onClick: IIndividualCard['onClick'];
  eWalletAccountId: string;
  account: IIndividualCard['account'];
  link: IIndividualCard['link'];
}

const EWalletBalance: React.FC<IEWalletBalance> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  eWalletAccountId,
  account,
  link,
}) => {
  const [balance, setBalance] = useState<string>(account.balance);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    account.latestTransaction
  );
  const [expired, setExpired] = useState<boolean>(account.expired);

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
        type: 'EWallet',
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

export default EWalletBalance;
