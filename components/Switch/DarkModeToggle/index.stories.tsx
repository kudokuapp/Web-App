import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import DarkModeToggle from './index';
import type { IDarkModeToggle } from './index.d';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Components/Switch/DarkModeToggle',
  component: DarkModeToggle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof DarkModeToggle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DarkModeToggle> = (args) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      <DarkModeToggle {...args} />
      <p>isDarkTheme: {isDarkTheme}</p>
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  // checked: true,
  //   onChange: () => console.log('change'),
} as IDarkModeToggle;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A82',
  },
};
