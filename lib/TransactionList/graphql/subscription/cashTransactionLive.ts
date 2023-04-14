import { gql } from '@apollo/client';

export const cashTransactionLive = gql`
  subscription CashTransactionLive($cashAccountId: String!) {
    cashTransactionLive(cashAccountId: $cashAccountId) {
      mutationType
      transaction {
        amount
        cashAccountId
        category {
          amount
          name
        }
        currency
        dateTimestamp
        direction
        id
        internalTransferTransactionId
        isHideFromBudget
        isHideFromInsight
        location {
          latitude
          longitude
        }
        merchant {
          id
          name
          picture
          url
        }
        merchantId
        notes
        tags {
          amount
          name
        }
        transactionName
        transactionType
      }
    }
  }
`;
