import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { ITextInput } from './index';
import TextInput from './index';
import Docs from './index.mdx';

export default {
  title: 'Input Placeholder/Text Input',
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => (
  <div className="max-w-[300px]">
    <TextInput {...args} />
  </div>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  placeholder: 'Placeholder',
} as ITextInput;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
