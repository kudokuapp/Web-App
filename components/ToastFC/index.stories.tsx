import { ComponentMeta, ComponentStory } from '@storybook/react';
import ToastFC from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Components/ToastFC',
  component: ToastFC,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof ToastFC>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToastFC> = (args) => {
  return (
    <>
      <ToastFC {...args} />
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A82',
  },
};
