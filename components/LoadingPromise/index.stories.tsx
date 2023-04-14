import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useState } from 'react';
import LoadingPromise from './index';

// const ThemeDecorator = (Story: any) => (
//   <ThemeContextProvider>
//     <Story />
//   </ThemeContextProvider>
// );

export default {
  title: 'Components/Loading Promise',
  component: LoadingPromise,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   decorators: [ThemeDecorator],
} as ComponentMeta<typeof LoadingPromise>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadingPromise> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const somePromise = () => {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve('mantep');
      }, 5000);
    });
  };

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await somePromise();
        console.log(response);
        setIsSuccess(true);
      } catch {
        setIsError(true);
      }
    })();

    setIsLoading(false);
  }, []);

  return (
    <>
      <LoadingPromise
        state={{
          isLoading,
          isSuccess,
          isError,
        }}
        text={{
          loading: 'Loading...',
          success: 'Sukses!',
          error: 'Error!',
          default: 'Ngambil EE...',
        }}
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
