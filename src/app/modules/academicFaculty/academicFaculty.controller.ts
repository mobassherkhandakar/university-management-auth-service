import { Request, Response } from 'express';
import { paginationSortFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(facultyData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Faculty done',
    data: result,
  });
});
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationSortFields);
  const filters = pick(req.query, ['searchTerm', 'title']);
  const result = await AcademicFacultyService.getAllFaculty(
    paginationOption,
    filters,
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Faculty done',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
};
