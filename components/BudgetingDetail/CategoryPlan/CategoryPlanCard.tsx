import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  cookies: {
    token?: string;
    categoryPlan?: {
      idCategoryPlan: string;
      budgetId: string;
      createdAt: string;
      lastUpdate: string;
      categoryId: string;
      tagId: string;
      amount: string;
      monthly: boolean;
    };
  };
}

export default function CategoryPlanCard(props: Props) {
  const { token, categoryPlan } = props.cookies;

  return (
    <>
      <div className="flex gap-2 flex-row h-fit overflow-x-auto items-start justify-start pt-4">
        <div
          className="rounded-2xl w-fit text-xs"
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}
        >
          {categoryPlan?.categoryId.slice(0, 6)}
        </div>
        <div className="text-xs">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(200000)}
        </div>
        <div className="relative w-full py-1">
          <div className="h-2 text-xs flex rounded-xl bg-gray-100">
            <div
              style={{
                width: `${(200000 / Number(categoryPlan?.amount)) * 100}%`,
                backgroundColor: `#${Math.floor(
                  Math.random() * 16777215
                ).toString(16)}`,
              }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
            ></div>
          </div>
        </div>
        <div className="text-xs">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(Number(categoryPlan?.amount))}
        </div>
        <FontAwesomeIcon icon={faArrowRight} size="sm" />
      </div>
    </>
  );
}
