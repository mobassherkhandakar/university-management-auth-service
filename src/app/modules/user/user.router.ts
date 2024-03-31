import express from 'express';
import { ENUM_USER_ROLE } from '../../../enum/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.STUDENT),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);

export const UserRouter = router;
