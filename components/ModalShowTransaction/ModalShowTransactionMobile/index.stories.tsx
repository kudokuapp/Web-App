import client from '$utils/graphql';
import { gql } from '@apollo/client';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import ModalShowTransactionMobile from './index';
// import Docs from './index.mdx';

export default {
  title: 'Components/Modal Show Transaction/Mobile',
  component: ModalShowTransactionMobile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  //   parameters: {
  //     docs: {
  //       page: Docs,
  //     },
  //   },
} as ComponentMeta<typeof ModalShowTransactionMobile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalShowTransactionMobile> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA0ODIxZGMzNjM1OGNhZDU5NDA2MzEiLCJpYXQiOjE2Nzk5MDc0MDV9.ESWTAk0dY_N4F1HwcW6LIhzzNi17XTyVGGXM-au0ank';

  const transaction = {
    __typename: 'CashTransaction' as IGetAllCashTransaction['__typename'],
    id: '642bc107ace68263d4323f63',
    transactionName: 'Aqua Nisa',
    cashAccountId: '642ad15353fb4dd1ae2d4a5c',
    dateTimestamp: '2023-04-04T06:17:43.610Z',
    currency: 'IDR' as IGetAllCashTransaction['currency'],
    amount: '7000',
    merchant: {
      id: '642bc0f4ace68263d4323f62',
      name: 'Transmart',
      picture: 'NO',
      url: 'https://id.m.wikipedia.org/wiki/Transmart',
    },
    merchantId: '642bc0f4ace68263d4323f62',
    category: [
      {
        amount: '7000',
        name: 'UNDEFINED',
      },
    ],
    transactionType: 'EXPENSE' as IGetAllCashTransaction['transactionType'],
    internalTransferTransactionId: null,
    direction: 'OUT' as IGetAllCashTransaction['direction'],
    notes: null,
    location: null,
    tags: null,
    isHideFromBudget: false,
    isHideFromInsight: false,
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
      <div className="max-w-[390px]">
        <ModalShowTransactionMobile
          token={token}
          onAddMerchant={onAddMerchant}
          merchantSubscription={merchantSubScription}
          getAllMerchant={getAllMerchant}
          transaction={transaction}
          isOpen={isOpen}
          onCloseModal={() => setIsOpen(false)}
          accountType={'cash'}
          onSaveEditFunction={(_e) => new Promise(() => {})}
          onDeleteFunction={(_e) => new Promise(() => {})}
        />
      </div>

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
