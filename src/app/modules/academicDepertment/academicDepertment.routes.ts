import express from 'express';
import { AcademicDepartmentController } from './academicDepertment.controller';
const routes = express.Router();

routes.post(
  '/create-department',

  AcademicDepartmentController.createDepartmet,
);
routes.get('/:id', AcademicDepartmentController.getSingleDeparment);
routes.get('/', AcademicDepartmentController.getAllDepartment);

export const AcademicDepartmentRoute = routes;
