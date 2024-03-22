import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //generate user id
  const id = await generateUserId();
  user.id = id;

  // set user pass
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createUser = await User.create(user);
  if (!createUser) {
    throw new Error('User created Faild');
  }
  return createUser;
};

export const UserService = {
  createUser,
};
