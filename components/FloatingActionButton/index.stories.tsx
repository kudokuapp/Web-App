import { faCalculator, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FloatingActionButton from './index';
import type { IFloatingActionButton } from './index.d';

export default {
  title: 'Components/Floating Action Button',
  component: FloatingActionButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FloatingActionButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FloatingActionButton> = (args) => {
  return <FloatingActionButton {...args} />;
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  actions: [
    {
      icon: faCalculator,
      onClick: () => alert('FAB Click 1'),
      color: null,
      textColor: null,
      name: 'Action 1',
    },
    {
      icon: faCalendar,
      onClick: () => alert('FAB Click 2'),
      color: 'bg-primary',
      textColor: 'text-onPrimary',
      name: 'Action 2',
    },
  ],
} as IFloatingActionButton;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A82',
  },
};
