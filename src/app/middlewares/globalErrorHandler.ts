import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interface/error';

const gobalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statasCode = 500;
  let message = 'Somthing went wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statasCode = simplifiedError.statasCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statasCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statasCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.node_env !== 'production' ? error.stack : undefined,
  });
  next();
};
export default gobalErrorHandler;
