import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import TextInput from './index';
import type { ITextInput } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Input Placeholder/Text Input',
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (username !== 'fdwilogo') {
          setError(true);
          setErrorMessage('Only fdwilogo allowed');
        } else {
          setError(false);
        }
      }}
    >
      <div className="max-w-[300px]">
        <TextInput
          {...args}
          error={error}
          errorMessage={errorMessage}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(false);
          }}
        />
      </div>
      <input type="submit" />
      <p>current input: {username}</p>
    </form>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  placeholder: 'Placeholder',
} as ITextInput;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
