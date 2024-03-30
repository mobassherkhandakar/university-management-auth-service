import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginUserData } = req.body;
  const result = await AuthService.loginUser(loginUserData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login successful',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
