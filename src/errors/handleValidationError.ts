import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (elm: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elm?.path,
        message: elm?.message,
      };
    },
  );
  const statasCode = 400;
  return {
    statasCode,
    message: 'Mongose Validation Error',
    errorMessage: errors,
  };
};

export default handleValidationError;
