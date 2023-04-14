import { gql } from '@apollo/client';

export const payLaterTransactionLive = gql`
  subscription PayLaterTransactionLive($payLaterAccountId: String!) {
    payLaterTransactionLive(payLaterAccountId: $payLaterAccountId) {
      mutationType
      transaction {
        id
        transactionName
        payLaterAccountId
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
      }
    }
  }
`;
