import express from 'express';
import { AcademicDepartmentController } from './academicDepertment.controller';
const routes = express.Router();

routes.post(
  '/create-department',

  AcademicDepartmentController.createDepartmet,
);

export const AcademicDepartmentRoute = routes;
