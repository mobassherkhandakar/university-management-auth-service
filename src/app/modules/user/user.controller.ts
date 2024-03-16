import { Request, Response } from 'express'
import { UserService } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      succsess: true,
      message: 'Create User successfully done',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      succuss: false,
      message: 'Crate User requist Faild',
      errorMassage: error,
    })
  }
}
export const UserController = {
  createUser,
}
