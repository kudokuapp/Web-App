import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { ILottie } from '../index';
import LottieFC from '../index';
import animation from './index.json';

export default {
  title: 'Lottie/Checked',
  component: LottieFC,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LottieFC>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LottieFC> = (args) => (
  <LottieFC {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  width: 300,
  height: 300,
  loop: true,
  animationData: animation,
} as ILottie;
