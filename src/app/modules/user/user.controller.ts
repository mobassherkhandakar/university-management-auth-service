import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...user } = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      succsess: true,
      message: 'Create User successfully done',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createUser,
};
