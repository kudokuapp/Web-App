'use client';
import LottieFC from '$components/Lottie';
import LoadingMoney from '$components/Lottie/LoadingMoney';

export function Loading({ text }: { text: string }) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 m-4">
      <section className="max-w-[300px] max-h-[300px]">
        <LottieFC
          loop={true}
          width={10}
          height={10}
          animationData={LoadingMoney}
        />
      </section>

      <section className="flex flex-col items-center justify-center gap-2">
        <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark animate-pulse">
          {text}
        </p>

        <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark animate-pulse">
          Jangan close browser ini!
        </p>
      </section>
    </section>
  );
}
