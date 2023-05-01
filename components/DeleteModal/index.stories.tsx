import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import DeleteModal from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Components/Delete Modal',
  component: DeleteModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof DeleteModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DeleteModal> = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirm={() => alert('close')}
      />
      <button onClick={() => setIsOpen(true)}>Show Modal</button>
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
