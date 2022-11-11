import FurqonAvatar from '$public/avatar/furqon.png';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { ICalCom } from './index';
import CalCom from './index';

export default {
  title: 'Misc/Cal.com Modal',
  component: CalCom,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CalCom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CalCom> = (args) => <CalCom {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  founders: {
    name: 'Furqon Wilogo',
    title: 'Co-CEO',
    avatar: FurqonAvatar,
    calLink: 'furqon/kudoku',
  },
  user: {
    id: 1,
    firstname: 'Pler',
    lastname: 'Kuda',
    email: 'plerkuda@gmail.com',
    whatsapp: '+628123123123',
    registerdate: new Date(),
    invited: false,
  },
} as ICalCom;

// Base.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A277',
//   },
// };
