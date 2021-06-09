import { Document, Model, ObjectId } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export interface UserDocument extends IUser, Document {}

export interface UserModel extends Model<UserDocument> {
  isEmailTaken: (email: string, excludeUserId?: ObjectId | string) => boolean;
  isPasswordMatch: (password: string) => boolean;
}
