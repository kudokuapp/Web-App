import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import type { IGetAllCashTransaction } from '../../global';
import OneTransaction from './index';
import type { IOneTransaction } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/One Transaction',
  component: OneTransaction,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof OneTransaction>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OneTransaction> = (args) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<IGetAllCashTransaction | null>(null);
  const transaction: IGetAllCashTransaction = {
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
        name: 'Groceries',
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
  };

  return (
    <>
      <OneTransaction
        {...args}
        transaction={transaction}
        selectedTransaction={selectedTransaction}
      />
      <button
        onClick={() => {
          if (selectedTransaction === null) {
            setSelectedTransaction(transaction);
          } else {
            setSelectedTransaction(null);
          }
        }}
      >
        set selected transaction === current transaction
      </button>
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  onClick: () => alert('click'),
} as IOneTransaction;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
