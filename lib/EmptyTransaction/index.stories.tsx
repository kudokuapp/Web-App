import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmptyTransaction from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Lib/Empty Transaction',
  component: EmptyTransaction,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof EmptyTransaction>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EmptyTransaction> = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  return (
    <>
      <EmptyTransaction token={token} />
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
