import { getInfoBudgeting } from 'app/kudoku/budgeting/graphql_/query/getInfoBudgeting';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface IGetCardHeader {
  budgetId: string;
  budgetName: string;
  budgetAmount: string;
  createdAt: string;
}

export default function CardHeader({
  token,
  id,
  user_id,
}: {
  token: string;
  id: string;
  user_id: string;
}) {
  const [cardHeader, seCardHeader] = useState<IGetCardHeader>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInfoBudgeting(token as string, id as string);
      seCardHeader({
        budgetId: data.id,
        budgetName: data.budgetName,
        createdAt: data.createdAt,
        budgetAmount: data.amount,
      });
    };
    if (token && user_id) {
      fetchData();
    }
  }, [id, token, user_id]);

  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="text-md font-bold">{cardHeader?.budgetName}</div>
          <div className="text-xs">
            Dibuat:{' '}
            <strong>
              {moment(cardHeader?.createdAt).format('dddd, D MMMM YYYY')}
            </strong>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>Rencana pengeluaran tiap kategori</p>
          <button>+</button>
        </div>
      </div>
    </>
  );
}
