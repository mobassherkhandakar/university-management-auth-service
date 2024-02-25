import { Request, Response } from 'express';
import { paginationSortFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepertment.interface';
import { AcademicDepartmentService } from './academicDepertment.service';

const createDepartmet = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result =
    await AcademicDepartmentService.createDepertment(departmentData);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create AcademicDepartment done',
    data: result,
  });
});
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  {
    const pagination = pick(req.query, paginationSortFields);
    const filters = pick(req.query, ['title']);
    const result = await AcademicDepartmentService.getAllDepartment(
      pagination,
      filters,
    );
    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all department done',
      meta: result.meta,
      data: result.data,
    });
  }
});
const getSingleDeparment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getSingleDeparment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Single semester done',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createDepartmet,
  getAllDepartment,
  getSingleDeparment,
};
