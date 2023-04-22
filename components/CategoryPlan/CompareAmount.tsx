interface IGetCategoryPlanCard {
  idCategoryPlan: string;
  budgetId: string;
  createdAt: string;
  lastUpdate: string;
  categoryId: string;
  tagId: string;
  amount: string;
  monthly: boolean;
}

interface Props {
  cookies: {
    budgetAmount?: string;
    categoryPlan?: IGetCategoryPlanCard[];
  };
}

export default function CompareAmount(props: Props) {
  const { budgetAmount, categoryPlan } = props.cookies;

  const Total = categoryPlan?.reduce(
    (prevValue, currentValue) =>
      Number(prevValue) + Number(currentValue.amount),
    0
  );

  return (
    <>
      <div className="flex flex-row justify-start">
        <div className="text-sm">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(Number(Total))}{' '}
          /
        </div>
        <div className="text-sm">
          &nbsp;
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(Number(budgetAmount))}
        </div>
      </div>
    </>
  );
}
