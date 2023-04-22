import OneCategoryPlanCard from '$components/BudgetingDetail/CategoryPlan/index';
import type { IOneCategoryPlanCard } from '$components/BudgetingDetail/CategoryPlan/index.d';
import { gql } from '@apollo/client';

interface ICategoryPlanList {
  token: IOneCategoryPlanCard['token'];
  categoryPlan: IOneCategoryPlanCard['categoryPlan'];
}

const CategoryPlanList: React.FC<ICategoryPlanList> = ({
  token,
  categoryPlan,
}) => {
  //   const [amount, setAmount] = useState<string>(budgeting.amount);
  //   const [lastUpdate, setLastUpdate] = useState<string | null>(
  //     budgeting.lastUpdate
  //   );

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

  //   const { data } = useSubscription(updatedBudgetingtLive, {
  //     variables: { budgetTypeId },
  //   });

  //   useEffect(() => {
  //     if (data) {
  //       setAmount(data.updatedBudgetingtLive.amount);
  //       setLastUpdate(data.updatedBudgetingtLive.lastUpdate);
  //     }
  //   }, [data]);

  return (
    <OneCategoryPlanCard
      token={token}
      categoryPlan={{
        idCategoryPlan: categoryPlan.idCategoryPlan,
        budgetId: categoryPlan.budgetId,
        createdAt: categoryPlan.createdAt,
        lastUpdate: categoryPlan.lastUpdate,
        categoryId: categoryPlan.categoryId,
        tagId: categoryPlan.tagId,
        amount: categoryPlan.amount,
        monthly: categoryPlan.monthly,
      }}
    />
  );
};

export default CategoryPlanList;
