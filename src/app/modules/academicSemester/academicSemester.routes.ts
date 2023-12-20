import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const route = express.Router();

route.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.academicSemeterZodSchema),
  AcademicSemesterController.createSemester,
);
route.get('/:id', AcademicSemesterController.getSingleSemester);
route.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.academicSemeterUpdateZodSchema),
  AcademicSemesterController.updateSemester,
);
route.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoute = route;
