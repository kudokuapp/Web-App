import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ModalEditAccount from './index';
// import Docs from './index.mdx';

export default {
  title: 'Components/Modal Edit Account',
  component: ModalEditAccount,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ModalEditAccount>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalEditAccount> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const handleSubmit = (
    token: string,
    accountId: string,
    cashAccountName: string | null,
    eMoneyCardNumber: string | null,
    eMoneyInstitutionId: string | null
  ) => {
    console.table({
      token,
      accountId,
      cashAccountName,
      eMoneyCardNumber,
      eMoneyInstitutionId,
    });
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

      <ModalEditAccount
        token={token}
        isOpen={isOpen}
        accountId={'642ad15353fb4dd1ae2d4a5c'}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit}
        type={'emoney'}
        cashOption={{ accountName: 'Cash' }}
        eMoneyOption={{
          cardNumber: '0145200022854964',
          institutionId: '6408f95f1ff428549fc7cbe4',
        }}
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
