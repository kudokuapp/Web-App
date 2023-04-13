import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ModalAddMerchant from './index';

// import Docs from './index.mdx';

export default {
  title: 'Components/Modal Add Merchant',
  component: ModalAddMerchant,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ModalAddMerchant>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalAddMerchant> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState('Transmart');
  const [urlMerchant, setUrlMerchant] = useState('');

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show modal
      </button>
      <ModalAddMerchant
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        query={query}
        setQuery={setQuery}
        urlMerchant={urlMerchant}
        setUrlMerchant={setUrlMerchant}
        onAddMerchant={(name, url) =>
          alert(`adding merchant with name: ${name} and url: ${url}`)
        }
      />
    </>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/CK0GI01gJ41mAzLy3zLFA6/Input-Placeholder?node-id=27%3A22',
  },
};