import EmptyData from '$public/splash_screens/emptyData.svg';
import Image from 'next/image';

export default function EmptyCash({
  setIsAddTransaction,
}: {
  setIsAddTransaction: any;
}) {
  return (
    <div className="flex flex-col items-center bg-onPrimary text-onSurfaceVariant dark:text-surfaceVariant dark:bg-onBackground align-middle justify-center h-screen w-screen">
      <Image
        height={400}
        src={EmptyData}
        quality={100}
        alt="Kudoku Logo"
        draggable={false}
      />
      <h4>No tracked transactions available.</h4>
      <h4 className="my-4">
        {' '}
        <button
          onClick={() => setIsAddTransaction((c: any) => !c)}
          className="border-2 border-outline py-1 px-2 rounded-md hover:bg-primary hover:text-onPrimary"
        >
          + Add Transaction
        </button>{' '}
        to get started!
      </h4>
    </div>
  );
}
