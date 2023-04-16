import client from '$utils/graphql';
import { gql } from '@apollo/client';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NameAmount } from 'global';
import { useState } from 'react';
import { IMerchant } from '../SearchMerchant/index.d';
import ModalAddTransaction from './index';
// import Docs from './index.mdx';

export default {
  title: 'Components/Modal Add Transaction',
  component: ModalAddTransaction,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ModalAddTransaction>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalAddTransaction> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const accountId = '102938129084901284';

  const institutionId = '129037812904578129084';

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

  const handleSubmit = (
    token: string,
    accountId: string,
    accountType: 'cash' | 'debit' | 'ewallet' | 'paylater' | 'emoney',
    transactionType: string | undefined,
    transactionName: string | undefined,
    transactionAmount: string | undefined,
    category: NameAmount[] | undefined,
    merchant: IMerchant | undefined
  ) => {
    console.log({
      token,
      accountId,
      accountType,
      transactionType,
      transactionName,
      transactionAmount,
      category,
      merchant,
    });
  };

  return (
    <>
      <ModalAddTransaction
        token={token}
        accountId={accountId}
        institutionId={institutionId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onAddMerchant={onAddMerchant}
        merchantSubscription={merchantSubScription}
        getAllMerchant={getAllMerchant}
        accountType={'cash'}
        onSubmit={handleSubmit}
      />

      <button onClick={() => setIsOpen(true)}>Show modal</button>
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
