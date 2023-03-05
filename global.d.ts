/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';

export {};

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
    category: Category;
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
}

/**
 * Category type dari Brick
 */
type Category = {
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
