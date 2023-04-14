import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ModalAddFinancialAccount from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Lib/Modal Add Financial Account',
  component: ModalAddFinancialAccount,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof ModalAddFinancialAccount>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalAddFinancialAccount> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  return (
    <>
      <ModalAddFinancialAccount
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        token={token}
      />
      <button onClick={() => setIsOpen(true)}>Show modal</button>
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
