import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRef } from 'react';
import data from './data/data';
import DraggableTransactions from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Lib/Draggable Transaction',
  component: DraggableTransactions,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof DraggableTransactions>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DraggableTransactions> = () => {
  const windowRef = useRef(null);
  return (
    <>
      <div ref={windowRef} className="w-[100vw] h-[100vh]">
        <DraggableTransactions
          merchant={data[0].merchant}
          amount={data[0].amount}
          imageSrc={data[0].imageSrc}
          spawn={'top'}
          customRef={windowRef}
        />
      </div>
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
