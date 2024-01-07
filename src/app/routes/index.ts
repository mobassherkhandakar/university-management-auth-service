import express from 'express';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.routes';
import { UserRouter } from '../modules/user/user.router';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouter,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
export default routes;
