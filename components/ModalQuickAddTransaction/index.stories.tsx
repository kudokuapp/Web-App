import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ModalQuickAddTransaction from './index';
// import Docs from './index.mdx';

export default {
  title: 'Components/Modal Quick Add Transaction',
  component: ModalQuickAddTransaction,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ModalQuickAddTransaction>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalQuickAddTransaction> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const handleSubmit = (
    token: string,
    transactionName: string,
    amount: string
  ) => {
    console.table({ token, transactionName, amount });
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show modal (note: change type in stories)
      </button>

      <ModalQuickAddTransaction
        token={token}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit}
        type={'EXPENSE'}
      />
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
