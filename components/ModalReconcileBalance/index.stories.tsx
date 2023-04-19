import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ModalReconcileBalance from './index';
// import Docs from './index.mdx';

export default {
  title: 'Components/Modal Reconcile Balance',
  component: ModalReconcileBalance,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ModalReconcileBalance>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalReconcileBalance> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const handleSubmit = (token: string, amount: string) => {
    console.table({ token, amount });
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show modal
      </button>

      <ModalReconcileBalance
        token={token}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit}
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
