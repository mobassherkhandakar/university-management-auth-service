import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.facultyValidationSchema),
  UserController.createFaculty,
);

export const UserRouter = router;
