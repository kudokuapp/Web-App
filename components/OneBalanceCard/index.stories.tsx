import { ComponentMeta, ComponentStory } from '@storybook/react';
import OneBalanceCard from './index';
import type { IOneBalanceCard } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/One Balance Card',
  component: OneBalanceCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof OneBalanceCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OneBalanceCard> = (args) => {
  return <OneBalanceCard {...args} />;
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  isSelected: true,
  onClick: () => {
    alert('click');
  },
  account: {
    institutionId: 'Cash',
    accountNumber: 'Cash',
    balance: '1000000',
    latestTransaction: '2023-04-04T06:17:42.487Z',
    createdAt: '2023-04-03T13:14:59.093Z',
    type: 'Cash',
    expired: false,
  },
  optionsButton: {
    editAccount: {
      show: true,
      onClick: () => alert('edit account'),
    },
    deleteAccount: { show: true, onClick: () => alert('delete account') },
  },
  link: 'https://localhost:6060/',
} as IOneBalanceCard;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
