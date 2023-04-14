/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';

export {
  IGetAllCashTransaction,
  BrickTransactionData,
  BrickGetClientIdandRedirectRefId,
  BrickAccountDetail,
  BrickTokenData,
  BrickOTPData,
  PostgresDataKudokuUser,
  MongoDBUserData,
  IGetAllCashTransaction,
  IGetAllDebitTransaction,
  IGetAllEMoneyTransaction,
  IGetAllEWalletTransaction,
  IGetAllPayLaterTransaction,
  GraphqlError,
  BrickCategory,
  Merchant,
  NameAmount,
  Location,
  Currency,
  Direction,
  TransactionType,
};

declare global {
  /**
   * Data dari Brick
   * Type subject to change
   * API v.1.0.0 Brick
   * @see https://technical-docs.onebrick.io
   */
  interface BrickTransactionData {
    dateTimestamp: string | Date;
    id: number;
    account_id: string;
    account_number: string;
    account_currency: 'IDR' | 'USD' | 'GBP' | 'SGD';
    institution_id: number;
    merchant_id: number;
    outlet_outlet_id: number;
    location_city_id: number;
    location_country_id: number;
    date: string | Date;
    amount: number;
    description: string;
    status: 'CONFIRMED' | 'PENDING';
    direction: 'out' | 'in';
    reference_id: string;
    category: BrickCategory | null;
    transaction_type: null | string;
  }

  /**
   * Data dari brick buat clientId dan redirectRefId
   */
  interface BrickGetClientIdandRedirectRefId {
    clientId: number;
    clientName: string;
    clientFullName: string;
    clientEmail: string;
    clientAlias: string | null;
    clientImageUrl: string | URL;
    clientFavicon: string | null | URL;
    primaryColor: string;
    redirectRefId: number;
    language: 'id' | 'en';
    isWhiteLabel: boolean;
  }

  /**
   * Brick account detail data
   */
  interface BrickAccountDetail {
    accountId: string;
    accountHolder: string;
    accountNumber: string;
    balances: {
      available: number;
      current: number;
      limit: null | number;
    };
    currency: string;
    type?: string;
    accessToken?: string;
  }

  /**
   * Data dari brick
   * Dapet pas ngambil accessToken
   */
  interface BrickTokenData {
    accessToken: string;
    ubc_id: number;
    bankId: string;
    target: string | URL;
    userId: string;
  }

  /**
   * Brick OTP Data buat gojek (gopay)
   */
  interface BrickOTPData {
    username: string;
    uniqueId: string;
    sessionId: string;
    otpToken: string;
    refId: string;
    deviceId: string;
  }

  /**
   * Postgresql data Kudoku
   * Useful buat API biasa yang gaada type
   */

  interface PostgresDataKudokuUser {
    email: string;
    firstname: string;
    id: number;
    invited: boolean;
    lastname: string;
    parentid: number | null;
    registerdate: Date | string;
    source: 'website' | 'bgst' | 'app';
    subscribe: boolean;
    whatsapp: string;
  }

  /**
   * MongoDB data buat "User"
   */
  interface MongoDBUserData {
    _id: ObjectId;
    username: string;
    password: string;
    pin: string;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    kudosNo: number;
    createdAt: Date | string;
  }

  /**
   * Data dari Kudoku-Server
   * Buat query "GetAllCashTransaction"
   */
  interface IGetAllCashTransaction {
    __typename: 'CashTransaction';
    id: string;
    transactionName: string;
    cashAccountId: string;
    dateTimestamp: string;
    currency: Currency;
    amount: string;
    merchant: Merchant;
    merchantId: string;
    category: NameAmount[] | null;
    transactionType: TransactionType;
    internalTransferTransactionId: string | null;
    direction: Direction;
    notes: string | null;
    location: Location | null;
    tags: NameAmount[] | null;
    isHideFromBudget: boolean;
    isHideFromInsight: boolean;
  }

  /**
   * Data dari Kudoku-Server
   * Buat query "GetAllDebitTransaction"
   */
  interface IGetAllDebitTransaction {
    __typename: 'DebitTransaction';
    amount: string;
    category: NameAmount[] | null;
    currency: Currency;
    dateTimestamp: string;
    debitAccountId: string;
    description: string;
    direction: Direction;
    id: string;
    institutionId: string;
    internalTransferTransactionId: string | null;
    isHideFromBudget: boolean;
    isHideFromInsight: boolean;
    isReviewed: boolean;
    isSubscription: boolean;
    location: Location | null;
    merchant: Merchant;
    merchantId: string;
    notes: string | null;
    onlineTransaction: boolean;
    referenceId: string;
    tags: NameAmount[] | null;
    transactionMethod: string;
    transactionName: string;
    transactionType: TransactionType;
  }

  /**
   * Data dari Kudoku-Server
   * Buat query "GetAllEMoneyTransaction"
   */
  interface IGetAllEMoneyTransaction {
    __typename: 'EMoneyTransaction';
    amount: string;
    category: NameAmount[] | null;
    currency: Currency;
    dateTimestamp: string;
    description: string;
    direction: Direction;
    eMoneyAccountId: string;
    id: string;
    institutionId: string;
    internalTransferTransactionId: string | null;
    isHideFromBudget: boolean;
    isHideFromInsight: boolean;
    isReviewed: boolean;
    location: Location | null;
    merchant: Merchant;
    merchantId: string;
    notes: string | null;
    tags: NameAmount[] | null;
    transactionName: string;
    transactionType: string;
  }

  /**
   * Data dari Kudoku-Server
   * Buat query "GetAllEWalletTransaction"
   */
  interface IGetAllEWalletTransaction {
    __typename: 'EWalletTransaction';
    amount: string;
    category: NameAmount[] | null;
    currency: Currency;
    dateTimestamp: string;
    description: string;
    direction: Direction;
    eWalletAccountId: string;
    id: string;
    institutionId: string;
    internalTransferTransactionId: string | null;
    isHideFromBudget: boolean;
    isHideFromInsight: boolean;
    isReviewed: boolean;
    isSubscription: boolean;
    location: Location | null;
    merchant: Merchant;
    merchantId: string;
    notes: string | null;
    onlineTransaction: boolean;
    referenceId: string;
    tags: NameAmount[] | null;
    transactionName: string;
    transactionType: string;
  }

  /**
   * Data dari Kudoku-Server
   * Buat query "GetAllPayLaterTransaction"
   */
  interface IGetAllPayLaterTransaction {
    __typename: 'PayLaterTransaction';
    amount: string;
    category: NameAmount[] | null;
    currency: Currency;
    dateTimestamp: string;
    description: string;
    direction: Direction;
    payLaterAccountId: string;
    id: string;
    institutionId: string;
    internalTransferTransactionId: string | null;
    isHideFromBudget: boolean;
    isHideFromInsight: boolean;
    isReviewed: boolean;
    isSubscription: boolean;
    location: Location | null;
    merchant: Merchant;
    merchantId: string;
    notes: string | null;
    onlineTransaction: boolean;
    referenceId: string;
    tags: NameAmount[] | null;
    transactionName: string;
    transactionType: string;
  }

  /**
   * GraphQL Error
   * ketika kita manggil query/mutation
   * trus ada error
   */
  interface GraphqlError {
    errors: {
      message: string;
      extensions: {
        code: number;
        exception: {
          name: string;
          message?: string;
          thrownValue?: Record<string, unknown>;
          stacktrace?: string[];
        };
      };
    }[];
    data: null;
  }
}

/**
 * Category type dari Brick
 */
type BrickCategory = {
  category_id: number;
  category_name:
    | 'transfer-out'
    | 'transfer-in'
    | 'purchase'
    | 'uncategorized'
    | 'payment'
    | 'cash-out'
    | 'cash-in';
  classification_group_id: number;
  classification_group: string;
  classification_subgroup_id: number;
  classification_subgroup: string;
};

/**
 * Type dari Kudoku-server
 */
type Merchant = {
  id: string;
  name: string;
  picture: string;
  url: string;
};

type NameAmount = {
  name: string;
  amount: string;
};

type Location = {
  latitude: string;
  longitude: string;
};

type Currency = 'IDR' | 'USD' | 'SGD';

type Direction = 'OUT' | 'IN';

type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';
