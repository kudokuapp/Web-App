import client from '$utils/graphql';
import { gql } from '@apollo/client';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import SearchMerchant from './index';
import type { IMerchant } from './index.d';
// import Docs from './index.mdx';

export default {
  title: 'Components/Search Merchant',
  component: SearchMerchant,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof SearchMerchant>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchMerchant> = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';
  const firstMerchant = {
    name: 'KFC',
    id: '63d3be20009767d5eb7e74e9',
  };

  const [selectedMerchant, setSelectedMerchant] = useState<IMerchant | null>(
    firstMerchant
  );

  const onSelectMerchant = (merchant: IMerchant | null) => {
    setSelectedMerchant(merchant);
  };

  const onAddMerchant = (name: string, url: string) => {
    alert(`Adding new merchant with ${name} and ${url}`);
  };

  const merchantSubScription = gql`
    subscription NewMerchantLive {
      newMerchantLive {
        id
        name
      }
    }
  `;

  return (
    <>
      <SearchMerchant
        token={token}
        firstMerchant={firstMerchant}
        onSelectMerchant={onSelectMerchant}
        onAddMerchant={onAddMerchant}
        merchantSubscription={merchantSubScription}
        getAllMerchant={getAllMerchant}
      />
      <p>selected merchant: {JSON.stringify(selectedMerchant)}</p>
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

interface IGetAllMerchant {
  id: string;
  name: string;
}

async function getAllMerchant(token: string): Promise<IGetAllMerchant[]> {
  const query = gql`
    query GetAllMerchant {
      getAllMerchant {
        id
        name
      }
    }
  `;

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { getAllMerchant },
        } = await client.query({
          query,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          fetchPolicy: 'network-only',
        });

        resolve(getAllMerchant);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
