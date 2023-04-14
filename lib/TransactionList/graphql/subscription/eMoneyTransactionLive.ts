import { gql } from '@apollo/client';

export const eMoneyTransactionLive = gql`
  subscription EMoneyTransactionLive($eMoneyAccountId: String!) {
    eMoneyTransactionLive(eMoneyAccountId: $eMoneyAccountId) {
      mutationType
      transaction {
        id
        transactionName
        eMoneyAccountId
        dateTimestamp
        institutionId
        currency
        amount
        isReviewed
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        category {
          name
          amount
        }
        transactionType
        internalTransferTransactionId
        description
        direction
        notes
        location {
          latitude
          longitude
        }
        tags {
          name
          amount
        }
        isHideFromBudget
        isHideFromInsight
      }
    }
  }
`;
