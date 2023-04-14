import FurqonAvatar from '$public/avatar/furqon.png';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CalCom from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Lib/Cal.com',
  component: CalCom,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof CalCom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CalCom> = () => {
  const founders = {
    name: 'Furqon Wilogo',
    title: 'Co-CEO',
    avatar: FurqonAvatar,
    calLink: 'furqon/kudoku',
  };

  const user = {
    email: 'fdwilogo@gmail.com',
    firstname: 'Furqon',
    id: 1,
    invited: false,
    lastname: 'Wilogo',
    parentid: null,
    registerdate: new Date(),
    source: 'website',
    subscribe: true,
    whatsapp: '+628517127312',
  } as PostgresDataKudokuUser;

  return (
    <>
      <CalCom founders={founders} user={user} />
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
