import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepertment } from './academicDepertment.interface';
import { AcademicDepartmentService } from './academicDepertment.service';

const createDepartmet = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result =
    await AcademicDepartmentService.createDepertment(departmentData);
  sendResponse<IAcademicDepertment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create AcademicDepartment done',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createDepartmet,
};
