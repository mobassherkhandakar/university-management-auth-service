import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statasCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
