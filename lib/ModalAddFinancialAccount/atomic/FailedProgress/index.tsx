'use client';

import LottieFC from '$components/LottieFC';
import Failed from '$components/LottieFC/Failed';

export function FailedProgress({ onClick }: { onClick: () => void }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 m-4">
      <section className="max-w-[300px] max-h-[300px]">
        <LottieFC loop={false} width={10} height={10} animationData={Failed} />
      </section>

      <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-justify mb-4">
        Error! Tolong report error ini ke{' '}
        <a
          className="text-primary dark:text-primaryDark"
          href="https://kudos-kudoku.slack.com/archives/C04K01EAVLL"
          target="_blank"
          rel="noreferrer"
        >
          Slack Kudos
        </a>{' '}
        atau via email ke{' '}
        <a
          className="text-primary dark:text-primaryDark"
          href="mailto:furqon@kudoku.id"
        >
          Furqon
        </a>{' '}
        atau{' '}
        <a
          className="text-primary dark:text-primaryDark"
          href="mailto:rizqy@kudoku.id"
        >
          Rizqy
        </a>
        !
      </p>

      <section className="flex flex-col gap-2 w-full h-fit">
        <button
          className="w-full h-fit py-2 text-lg shadow-xl rounded-lg bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark hover:bg-secondary dark:hover:bg-secondaryDark"
          onClick={onClick}
        >
          Tambah akun yang lain
        </button>

        <a
          className="w-full h-fit py-2 text-lg text-primary dark:text-primaryDark text-center hover:text-secondary dark:hover:text-secondaryDark"
          href="/kudoku"
        >
          Lanjut
        </a>
      </section>
    </section>
  );
}
