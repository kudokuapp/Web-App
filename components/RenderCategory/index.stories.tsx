import { ComponentMeta, ComponentStory } from '@storybook/react';
import RenderCategory from './index';
import type { IRenderCategory } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Render Category',
  component: RenderCategory,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof RenderCategory>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RenderCategory> = (args) => {
  return <RenderCategory {...args} />;
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  category: 'Takeaway',
  select: false,
} as IRenderCategory;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
