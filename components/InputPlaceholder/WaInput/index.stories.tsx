import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import cleanNum from '../../../utils/helper/cleanNum';
import WaInput from './index';
import type { IWaInput } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Input Placeholder/WA Input',
  component: WaInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof WaInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WaInput> = (args) => {
  const [phoneNum, setPhoneNum] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="max-w-[300px]">
        <WaInput
          {...args}
          placeholder="WhatsApp kamu"
          value={phoneNum}
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
        />
      </div>
      <input type="submit" />
      <p>current input: {phoneNum}</p>
      <p>With clean num: +62{cleanNum(phoneNum)}</p>
    </form>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  //   placeholder: 'Placeholder',
} as IWaInput;

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};
