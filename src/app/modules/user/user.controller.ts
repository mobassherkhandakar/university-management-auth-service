import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUser(user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create User SuccessFully done',
    data: result,
  });
});
export const UserController = {
  createUser,
};
