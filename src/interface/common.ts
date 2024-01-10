import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statasCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
