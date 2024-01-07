import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
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

export const AcademicFacultyController = {
  createFaculty,
};
