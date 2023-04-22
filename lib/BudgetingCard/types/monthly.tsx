import OneBudgetingCard from '$components/OneBudgetingCard';
import type { IOneBudgetingCard } from '$components/OneBudgetingCard/index.d';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';

interface IMonthlyBudgeting {
  isSelected: IOneBudgetingCard['isSelected'];
  selectedAccountRef: IOneBudgetingCard['selectedAccountRef'];
  onClick: IOneBudgetingCard['onClick'];
  budgetTypeId: string;
  budgeting: IOneBudgetingCard['budgeting'];
  link: IOneBudgetingCard['link'];
  token: string;
}

const MonthlyBudgeting: React.FC<IMonthlyBudgeting> = ({
  isSelected,
  selectedAccountRef,
  onClick,
  budgetTypeId,
  budgeting,
  link,
  token,
}) => {
  const [amount, setAmount] = useState<string>(budgeting.amount);
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    budgeting.lastUpdate
  );

  const updatedBudgetingtLive = gql`
    subscription UpdatedBudgetingtLive($budgetTypeId: String!) {
      updatedBudgetingtLive(budgetTypeId: $budgetTypeId) {
        id
        userId
        createdAt
        lastUpdate
        budgetTypeId
        budgetName
        amount
      }
    }
  `;

  const { data } = useSubscription(updatedBudgetingtLive, {
    variables: { budgetTypeId },
  });

  useEffect(() => {
    if (data) {
      setAmount(data.updatedBudgetingtLive.amount);
      setLastUpdate(data.updatedBudgetingtLive.lastUpdate);
    }
  }, [data]);

  return (
    <OneBudgetingCard
      link={link}
      isSelected={isSelected}
      selectedAccountRef={selectedAccountRef}
      onClick={onClick}
      budgeting={{
        id: budgeting.id,
        userId: budgeting.userId,
        budgetName: budgeting.budgetName,
        amount: amount,
        latestBudgeting: lastUpdate,
        createdAt: budgeting.createdAt,
        lastUpdate: budgeting.lastUpdate,
        budgetTypeId: budgeting.budgetTypeId,
      }}
      token={token}
      user_id={budgeting.userId}
      budgetId={budgeting.id}
    />
  );
};

export default MonthlyBudgeting;
