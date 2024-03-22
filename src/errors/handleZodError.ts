import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issu: ZodIssue) => {
    return {
      path: issu.path[issu.path.length - 1],
      message: issu?.message,
    };
  });
  const statasCode = 400;
  return {
    statasCode,
    message: 'Zod Validation Error',
    errorMessage: errors,
  };
};

export default handleZodError;
