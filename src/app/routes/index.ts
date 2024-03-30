import express from 'express';
import { AcademicDepartmentRoute } from '../modules/academicDepertment/academicDepertment.routes';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.routes';
import { AuthRoute } from '../modules/auth/auth.route';
import { ManagementDepartmentRoute } from '../modules/managementDepartment/managementDepartment.route';
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
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
export default routes;
