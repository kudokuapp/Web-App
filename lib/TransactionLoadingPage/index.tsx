const TransactionLoadingPage: React.FC = () => {
  return (
    <div className="sm:p-10 p-4 w-full mx-auto flex flex-col gap-10 h-fit">
      <div className="w-full flex gap-6 animate-pulse">
        {[1, 2, 3].map((val) => {
          return (
            <div className="w-72 h-40 rounded-lg bg-slate-700" key={val} />
          );
        })}
      </div>
      <div className="w-full flex flex-col gap-12 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((val) => {
          return (
            <div className="w-full h-4 rounded-full bg-slate-700" key={val} />
          );
        })}
      </div>
    </div>
  );
};

export default TransactionLoadingPage;
