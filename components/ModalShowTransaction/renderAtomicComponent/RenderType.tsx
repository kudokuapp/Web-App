interface IRenderType {
  transaction:
    | IGetAllCashTransaction
    | IGetAllDebitTransaction
    | IGetAllEWalletTransaction
    | IGetAllPayLaterTransaction
    | IGetAllEMoneyTransaction;
}

export const RenderType: React.FC<IRenderType> = ({ transaction }) => {
  const name = `${transaction.transactionType.charAt(
    0
  )}${transaction.transactionType.slice(1).toLowerCase()}`;
  if (transaction.transactionType === 'INCOME') {
    return (
      <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-green-500 rounded-lg">
        <p className="text-green-100">{name}</p>
      </div>
    );
  } else if (transaction.transactionType === 'EXPENSE') {
    return (
      <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-red-500 rounded-lg">
        <p className="text-red-100">{name}</p>
      </div>
    );
  } else {
    return (
      <div className="flex w-fit h-fit gap-2 px-2 py-1.5 bg-gray-500 rounded-lg">
        <p className="text-gray-100">{name}</p>
      </div>
    );
  }
};
