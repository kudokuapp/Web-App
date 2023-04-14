export interface ILoadingPromise {
  state: ILoadingPromiseState;
  text: ILoadingPromiseText;
}

type ILoadingPromiseText = {
  loading: string;
  success: string;
  error: string;
  default: string;
};

type ILoadingPromiseState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
