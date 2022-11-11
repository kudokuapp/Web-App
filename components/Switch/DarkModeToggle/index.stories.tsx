import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { IDarkModeToggle } from './index';
import DarkModeToggle from './index';

export default {
  title: 'Switch/Dark Mode Toggle',
  component: DarkModeToggle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DarkModeToggle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DarkModeToggle> = (args) => (
  <DarkModeToggle {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  checked: true,
  onChange: () => console.log('change'),
} as IDarkModeToggle;
