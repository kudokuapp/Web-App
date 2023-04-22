'use client';

import LottieFC from '$components/LottieFC';
import Checked from '$components/LottieFC/Checked';

export function SuccessBudget({ onClick }: { onClick: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 m-4">
      <section className="max-w-[300px] max-h-[300px]">
        <LottieFC loop={false} width={10} height={10} animationData={Checked} />
      </section>

      <section className="flex flex-col gap-2 w-full h-fit">
        <button
          className="w-full h-fit py-2 text-lg shadow-xl rounded-lg bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark hover:bg-secondary dark:hover:bg-secondaryDark"
          onClick={onClick}
        >
          Tambah budget lain
        </button>

        <a
          className="w-full h-fit py-2 text-lg text-primary dark:text-primaryDark text-center hover:text-secondary dark:hover:text-secondaryDark"
          href="/kudoku/budgeting"
        >
          Lanjut
        </a>
      </section>
    </section>
  );
}
