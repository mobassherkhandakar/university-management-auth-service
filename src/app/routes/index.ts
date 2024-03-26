import express from 'express';
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
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
export default routes;
