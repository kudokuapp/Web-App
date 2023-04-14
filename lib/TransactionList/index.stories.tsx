import { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionList from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Lib/Transaction List',
  component: TransactionList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof TransactionList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TransactionList> = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const id = '642ad15353fb4dd1ae2d4a5c';

  const allTransaction = [
    {
      __typename: 'CashTransaction',
      id: '642bc107ace68263d4323f63',
      transactionName: 'Aqua Nisa',
      cashAccountId: '642ad15353fb4dd1ae2d4a5c',
      dateTimestamp: '2023-04-04T06:17:43.610Z',
      currency: 'IDR',
      amount: '7000',
      merchant: {
        id: '642bc0f4ace68263d4323f62',
        name: 'Transmart',
        picture: 'NO',
        url: 'https://id.m.wikipedia.org/wiki/Transmart',
      },
      merchantId: '642bc0f4ace68263d4323f62',
      category: [
        {
          amount: '7000',
          name: 'UNDEFINED',
        },
      ],
      transactionType: 'EXPENSE',
      internalTransferTransactionId: null,
      direction: 'OUT',
      notes: null,
      location: null,
      tags: null,
      isHideFromBudget: false,
      isHideFromInsight: false,
    },
    {
      __typename: 'CashTransaction',
      id: '642bc08dace68263d4323f61',
      transactionName: 'Parkir starbucks',
      cashAccountId: '642ad15353fb4dd1ae2d4a5c',
      dateTimestamp: '2023-04-04T06:15:41.493Z',
      currency: 'IDR',
      amount: '5000',
      merchant: {
        id: '642bc07face68263d4323f60',
        name: 'Starbucks',
        picture: 'NO',
        url: 'https://www.starbucks.co.id/',
      },
      merchantId: '642bc07face68263d4323f60',
      category: [
        {
          amount: '5000',
          name: 'UNDEFINED',
        },
      ],
      transactionType: 'EXPENSE',
      internalTransferTransactionId: null,
      direction: 'OUT',
      notes: null,
      location: null,
      tags: null,
      isHideFromBudget: false,
      isHideFromInsight: false,
    },
  ] as IGetAllCashTransaction[];

  return (
    <>
      <TransactionList
        accountType={'cash'}
        token={token}
        allTransaction={allTransaction}
        id={id}
      />
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
