import _ from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import ExpenseCategoryDropdown from '../../ExpenseCategoryDropdown';
import RenderCategory from '../../RenderCategory';

interface IRenderCategoryModal {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
  isEdit: boolean;
  remainingCategory: number;
  userTransactionCategory: IUserTransactionCategory[];
  setUserTransactionCategory: Dispatch<
    SetStateAction<IUserTransactionCategory[]>
  >;
}

type IUserTransactionCategory = {
  name: string;
  amount: string;
  amountForDb?: string | undefined;
};

export const RenderCategoryModal: React.FC<IRenderCategoryModal> = ({
  transaction,
  isEdit,
  remainingCategory,
  userTransactionCategory,
  setUserTransactionCategory,
}) => {
  const { category } = transaction;

  if (category !== null) {
    return (
      <div className="flex flex-col gap-1">
        {isEdit ? (
          <p className="text-onPrimaryContainer dark:text-surfaceVariant">
            Sisa jumlah category:{' '}
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(remainingCategory)}
          </p>
        ) : (
          <p className="text-onPrimaryContainer dark:text-surfaceVariant">
            Category
          </p>
        )}

        <div className="border-2 border-gray-500 rounded-md">
          {userTransactionCategory.map((value, index) => {
            const onCategorySelect = (category: string) => {
              const data = [...userTransactionCategory];
              data[index].name = category;
              setUserTransactionCategory(data);
            };
            return (
              <div
                key={index}
                className="grid grid-cols-2 border-b-2 last:border-b-0 border-gray-500"
              >
                {isEdit ? (
                  <div className="border-r-[1px] border-gray-500 p-2">
                    <ExpenseCategoryDropdown
                      initialOption={value.name}
                      onCategorySelect={onCategorySelect}
                    />
                  </div>
                ) : (
                  <div className="border-r-[1px] border-gray-500 p-2">
                    <RenderCategory category={value.name} select={false} />
                  </div>
                )}

                {isEdit ? (
                  <div className="flex flex-col gap-1">
                    <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                      <input
                        type="text"
                        value={value.amount}
                        onKeyDown={(
                          event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          const { key } = event;
                          const value = (event.target as HTMLInputElement)
                            .value;
                          const isNumber = /[0-9]/.test(key);
                          const isComma = /[,]/.test(key);
                          const isBackspace = key === 'Backspace';
                          const isDelete = key === 'Delete';
                          const isArrowLeft = key === 'ArrowLeft';
                          const isArrowRight = key === 'ArrowRight';
                          const isHome = key === 'Home';
                          const isEnd = key === 'End';
                          const hasComma = value.indexOf(',') !== -1;

                          if (
                            (!isNumber &&
                              !isComma &&
                              !isBackspace &&
                              !isDelete &&
                              !isArrowLeft &&
                              !isArrowRight &&
                              !isHome &&
                              !isEnd) ||
                            (isComma && hasComma)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const data = [...userTransactionCategory];

                          data[index].amount = e.target.value;
                          data[index].amountForDb = e.target.value.replace(
                            ',',
                            '.'
                          );

                          setUserTransactionCategory(data);
                        }}
                      />
                    </div>
                    {value.amountForDb && (
                      <p>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }).format(Number(value.amountForDb))}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="w-full flex justify-end border-l-[1px] border-gray-500 p-2">
                    <p className="text-primary dark:text-primaryDark">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(
                        isNaN(Number(value.amount))
                          ? Number(value.amountForDb)
                          : Number(value.amount)
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {isEdit && (
            <button
              onClick={() => {
                const newCategory = { name: 'UNDEFINED', amount: '0' };
                const oldCategory = userTransactionCategory;
                const category = [...oldCategory, newCategory];
                const uniqueCategory = _.uniqBy(category, 'name');
                setUserTransactionCategory(uniqueCategory);

                console.log(userTransactionCategory);
              }}
            >
              Add new category
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
