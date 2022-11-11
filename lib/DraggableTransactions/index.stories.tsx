import { ComponentMeta, ComponentStory } from '@storybook/react';
import image from './data/images/1.png';
import type { IDraggableTransactions } from './index';
import DraggableTransactions from './index';

export default {
  title: 'Misc/Draggable Transactions',
  component: DraggableTransactions,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DraggableTransactions>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DraggableTransactions> = (args) => (
  <DraggableTransactions {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  merchant: 'Family Mart',
  amount: '21.000',
  spawn: 'top',
  imageSrc: image,
} as IDraggableTransactions;

// Base.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A277',
//   },
// };
