import ApiError from '../../../errors/ApiError';
import httpStatus from '../../../shared/httpStatus';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (loginData: ILoginUser) => {
  const { id } = loginData;
  const isExist = await User.findOne({ id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
export const AuthService = {
  loginUser,
};
