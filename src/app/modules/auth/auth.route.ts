import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
const routes = express.Router();
routes.post('/login-user', validateRequest(AuthValidation.loginUserZodSchema));

export const AuthRoute = routes;
