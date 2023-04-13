import { ComponentMeta, ComponentStory } from '@storybook/react';
import RenderMerchantImage from './index';
import type { IRenderMerchantImage } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Render Merchant Image',
  component: RenderMerchantImage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof RenderMerchantImage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RenderMerchantImage> = (args) => {
  return <RenderMerchantImage {...args} />;
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  merchantId: '63d3be20009767d5eb7e74e9',
  merchantName: 'KFC',
  size: 20,
} as IRenderMerchantImage;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};

export const Undefined = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Undefined.args = {
  merchantId: '63d8b775d3e050940af0caf1',
  merchantName: 'UNDEFINED',
  direction: 'OUT',
  size: 20,
} as IRenderMerchantImage;

Undefined.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};

export const InternalTransfer = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

InternalTransfer.args = {
  merchantId: '640ff9670ce7b9e3754d332d',
  merchantName: 'InternalTransfer',
  direction: 'OUT',
  size: 20,
} as IRenderMerchantImage;

InternalTransfer.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};

export const Reconcile = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Reconcile.args = {
  merchantId: '640ff9450ce7b9e3754d332c',
  merchantName: 'Reconcile',
  direction: 'OUT',
  size: 20,
} as IRenderMerchantImage;

Reconcile.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
