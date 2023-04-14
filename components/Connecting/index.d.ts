export interface IConnecting {
  promises: {
    // eslint-disable-next-line no-unused-vars
    promiseFn: (arg0?: object | any | unknown) => Promise<any | unknown>;
    isLoadingText: string;
    isErrorText: string;
    isSuccessText: string;
    defaultText: string;
  }[];
  onFulfilled: () => void;
  onRejected: () => void;
}
