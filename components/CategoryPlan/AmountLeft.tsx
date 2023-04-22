interface IGetAmountLeft {
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
    token?: string;
    user_id?: string;
    budgetId?: string;
    budgetAmount?: string;
    categoryPlan: IGetAmountLeft[];
  };
}

export default function AmountLeft(props: Props) {
  const { budgetAmount, categoryPlan } = props.cookies;

  const Total = categoryPlan.reduce(
    (prevValue, currentValue) =>
      Number(prevValue) + Number(currentValue.amount),
    0
  );

  const Left = Number(budgetAmount) - Total;

  return (
    <>
      <div className="flex flex-row justify-end">
        <div className="text-sm">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(Number(Left))}{' '}
          Left
        </div>
      </div>
      {/* {categoryPlan.map((value, index) => {
        const {
          idCategoryPlan,
          budgetId,
          createdAt,
          lastUpdate,
          categoryId,
          tagId,
          amount,
          monthly,
        } = value;
        return <div key={idCategoryPlan}>{amount}</div>;
      })} */}
    </>
  );
}
