import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statasCode = 400;
  return {
    statasCode,
    message: 'Cast Error',
    errorMessage: errors,
  };
};

export default handleCastError;
