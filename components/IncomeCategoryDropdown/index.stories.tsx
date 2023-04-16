import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import IncomeCategoryDropdown from './index';
import type { IIncomeCategoryDropdown } from './index.d';

export default {
  title: 'Components/Income Category Dropdown',
  component: IncomeCategoryDropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof IncomeCategoryDropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IncomeCategoryDropdown> = (args) => {
  const [selectedOption, setSelectedOption] = useState(args.initialOption);
  const onCategorySelect = (category: string) => {
    setSelectedOption(category);
  };
  return (
    <>
      <IncomeCategoryDropdown {...args} onCategorySelect={onCategorySelect} />
      <p>selectedOption state: {selectedOption}</p>
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  initialOption: 'Gift',
} as IIncomeCategoryDropdown;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A82',
  },
};
