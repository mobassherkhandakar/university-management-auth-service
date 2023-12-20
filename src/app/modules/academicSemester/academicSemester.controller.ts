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
  const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code']);
  const result = await AcademicSemesterService.getAllSemester(
    paginationOption,
    filters,
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getSingleSemester(req.params.id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get singel semester successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updateData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update semester done hoyse',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
};
