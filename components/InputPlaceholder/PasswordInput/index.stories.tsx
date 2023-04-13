import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import PasswordInput from './index';
import type { IPasswordInput } from './index.d';

export default {
  title: 'Components/Input Placeholder/Password Input',
  component: PasswordInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    // docs: {
    //   page: Docs, // use import Docs from './index.mdx';
    // },
  },
} as ComponentMeta<typeof PasswordInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PasswordInput> = (args) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== 'kudoku') {
          setError(true);
          setErrorMessage('Wrong password!');
        } else {
          setError(false);
        }
      }}
    >
      <div className="max-w-[300px]">
        <PasswordInput
          {...args}
          error={error}
          errorMessage={errorMessage}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
      </div>
      <input type="submit" />
      <p>Correct password: &quot;kudoku&quot;</p>
      <p>Current password: {password}</p>
    </form>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  placeholder: 'Placeholder',
} as IPasswordInput;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=59%3A82',
  },
};
