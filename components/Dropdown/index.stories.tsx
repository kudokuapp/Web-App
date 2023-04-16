import { ComponentMeta, ComponentStory } from '@storybook/react';
import Dropdown from './index';
import type { IDropdown } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof Dropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <>
      <Dropdown {...args} />
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  options: [
    { value: 'options1', label: 'Options 1' },
    { value: 'options2', label: 'Options 2' },
    { value: 'options3', label: 'Options 3' },
    { value: 'options4', label: 'Options 4' },
  ],
  onSelect: (v) => console.log(v),
} as IDropdown;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
