import { ComponentMeta, ComponentStory } from '@storybook/react';
import InstallButton from './index';

export default {
  title: 'Misc/Draggable Transactions',
  component: InstallButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof InstallButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InstallButton> = () => <InstallButton />;

export const Base = Template.bind({});
