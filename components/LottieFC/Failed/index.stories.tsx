import { ComponentMeta, ComponentStory } from '@storybook/react';
import LottieFC from '../index';
import type { ILottieFC } from '../index.d';
import Failed from './index';
// import Docs from './index.mdx';

export default {
  title: 'Components/LottieFC/Failed',
  component: LottieFC,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof LottieFC>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LottieFC> = (args) => {
  return (
    <>
      <p>Change width through div className</p>
      <p>Ratio lottie 1:1</p>
      <div className="w-[150px] h-[150px]">
        <LottieFC {...args} />
      </div>
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  loop: true,
  animationData: Failed,
} as ILottieFC;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
