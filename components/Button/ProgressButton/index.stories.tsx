import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProgressButton from './index';
import type { IProgressButton } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Button/Progress Button',
  component: ProgressButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ProgressButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProgressButton> = (args) => {
  return (
    <div className="max-w-[400px]">
      <ProgressButton {...args} />
    </div>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  disabled: false,
  text: 'Next',
  onClick: () => console.log('click'),
  from: '0%',
  to: '80%',
} as IProgressButton;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
