import { Request, Response } from 'express';
import { paginationSortFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result =
    await AcademicSemesterService.createSemester(academicSemesterData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create AcademicSemester Successfully Done',
    data: result,
  });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationSortFields);
  const result = await AcademicSemesterService.getAllSemester(paginationOption);
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
};
