// import { Request, Response } from 'express';
// import catchAsync from '../../../shared/catchAsync';
// import httpStatus from '../../../shared/httpStatus';
// import sendResponse from '../../../shared/sendResponse';
// import { IUser } from './user.interface';

// const createStudent = catchAsync(async (req: Request, res: Response) => {
//   const { student, ...userData } = req.body;
//   const result = await UserServi.createStudent(student, userData);
//   sendResponse<IUser>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Create Student SuccessFully done',
//     data: result,
//   });
// });

// export const UserController = {
//   createStudent,
// };
