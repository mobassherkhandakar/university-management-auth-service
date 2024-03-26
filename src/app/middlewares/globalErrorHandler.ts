/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interface/error';
import { logger } from '../../shared/logger';

const gobalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.node_env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : logger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statasCode = 500;
  let message = 'Somthing went wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statasCode = simplifiedError.statasCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.name) {
    const simplifiedError = handleCastError(error);
    statasCode = simplifiedError.statasCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statasCode = simplifiedError?.statasCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
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
};
export default gobalErrorHandler;
