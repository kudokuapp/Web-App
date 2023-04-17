import { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionLoadingPage from './index';
// import Docs from './index.mdx';

export default {
  title: 'Lib/Transaction Loading Page',
  component: TransactionLoadingPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof TransactionLoadingPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TransactionLoadingPage> = () => {
  return (
    <>
      <TransactionLoadingPage />
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
