import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginButton from './index';
import type { ILoginButton } from './index.d';

export default {
  title: 'Components/Button/Login Button',
  component: LoginButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LoginButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginButton> = (args) => (
  <LoginButton {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  //   placeholder: 'Placeholder',
} as ILoginButton;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A82',
  },
};
