import { ComponentMeta, ComponentStory } from '@storybook/react';
import Connecting from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Components/Connecting',
  component: Connecting,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof Connecting>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Connecting> = () => {
  const somePromise = () => {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve('mantep');
      }, 5000);
    });
  };

  return (
    <>
      <Connecting
        promises={[
          {
            promiseFn: somePromise,
            isLoadingText: 'Lagi loading...',
            defaultText: 'Ngambil promise',
            isErrorText: 'Error!',
            isSuccessText: 'Sukses!',
          },
          {
            promiseFn: somePromise,
            isLoadingText: 'Lagi loading...',
            defaultText: 'Ngambil promise',
            isErrorText: 'Error!',
            isSuccessText: 'Sukses!',
          },
        ]}
        onFulfilled={() => alert('promise fulfilled!')}
        onRejected={() => alert('promise rejected!')}
      />
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
