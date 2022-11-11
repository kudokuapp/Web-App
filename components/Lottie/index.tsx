import Lottie, { LottieComponentProps } from 'lottie-react';

export interface ILottie extends LottieComponentProps {}

const LottieFC: React.FC<ILottie> = ({
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
