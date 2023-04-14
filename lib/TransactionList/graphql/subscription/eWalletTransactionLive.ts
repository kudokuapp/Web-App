import { gql } from '@apollo/client';

export const eWalletTransactionLive = gql`
  subscription EWalletTransactionLive($eWalletAccountId: String!) {
    eWalletTransactionLive(eWalletAccountId: $eWalletAccountId) {
      mutationType
      transaction {
        id
        transactionName
        eWalletAccountId
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
