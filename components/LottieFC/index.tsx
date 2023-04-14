'use client';

import Lottie from 'lottie-react';
import type { ILottieFC } from './index.d';

const LottieFC: React.FC<ILottieFC> = ({
  loop,
  width,
  height,
  animationData,
}) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={true}
      width={width}
      height={height}
    />
  );
};

export default LottieFC;
