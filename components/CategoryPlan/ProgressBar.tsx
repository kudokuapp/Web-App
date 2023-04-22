interface IGetProgressBar {
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
    categoryPlan?: IGetProgressBar[];
  };
}

export default function ProgressBar(props: Props) {
  const { budgetAmount, categoryPlan } = props.cookies;

  return (
    <>
      <div className="relative py-2">
        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-xl bg-gray-100">
          {categoryPlan?.map((value, index) => {
            const { amount } = value;
            return (
              <div
                style={{
                  width: `${(Number(amount) / Number(budgetAmount)) * 100}%`,
                  backgroundColor: `#${Math.floor(
                    Math.random() * 16777215
                  ).toString(16)}`,
                }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
}
