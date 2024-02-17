import { Types } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: boolean;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};
