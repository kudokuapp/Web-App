import { ComponentMeta, ComponentStory } from '@storybook/react';
import BalanceCard, { IAccountsProps } from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Lib/Balance Card',
  component: BalanceCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof BalanceCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BalanceCard> = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const accounts = [
    {
      type: 'Cash',
      id: '642ad15353fb4dd1ae2d4a5c',
      accountNumber: 'Cash',
      balance: '59000',
      createdAt: '2023-04-03T13:14:59.093Z',
      latestTransaction: '2023-04-04T06:17:42.487Z',
      expired: false,
      institutionId: 'Cash',
    },
    {
      type: 'Debit',
      accountNumber: '4971037321',
      balance: '70850.83',
      createdAt: '2023-04-03T14:11:45.274Z',
      expired: false,
      id: '642adea1ace68263d4323f2c',
      institutionId: '63d8bb09a2b49c686d736525',
      latestTransaction: '2023-04-03T14:11:45.274Z',
    },
    {
      type: 'EWallet',
      institutionId: '63d94170d3e050940af0caf2',
      accountNumber: '+6285171232449',
      createdAt: '2023-04-03T14:24:00.849Z',
      latestTransaction: '2023-04-03T14:24:00.849Z',
      balance: '120000',
      expired: true,
    },
  ] as IAccountsProps[];

  return (
    <>
      <BalanceCard accounts={accounts} token={token} />
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
