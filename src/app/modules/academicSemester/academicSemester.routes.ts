import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const route = express.Router();

route.post('/create-semester', AcademicSemesterController.createSemester);

export const AcademicSemesterRoute = route;
