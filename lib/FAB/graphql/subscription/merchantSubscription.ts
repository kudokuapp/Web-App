import { gql } from '@apollo/client';

export const merchantSubscription = gql`
  subscription NewMerchantLive {
    newMerchantLive {
      id
      name
    }
  }
`;
