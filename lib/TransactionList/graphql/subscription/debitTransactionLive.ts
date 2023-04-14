import { gql } from '@apollo/client';

export const debitTransactionLive = gql`
  subscription DebitTransactionLive($debitAccountId: String!) {
    debitTransactionLive(debitAccountId: $debitAccountId) {
      mutationType
      transaction {
        id
        transactionName
        debitAccountId
        dateTimestamp
        referenceId
        institutionId
        currency
        amount
        onlineTransaction
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
        description
        internalTransferTransactionId
        direction
        isSubscription
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
        transactionMethod
      }
    }
  }
`;
