import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const route = express.Router();

route.post('/create-semester', AcademicSemesterController.createSemester);
route.get('/', AcademicSemesterController.getAllSemester);

export const AcademicSemesterRoute = route;
