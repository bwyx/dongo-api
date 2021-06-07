import { Document, Model, ObjectId } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  isEmailTaken: (email: string, excludeUserId?: ObjectId | string) => boolean;
  isPasswordMatch: (password: string) => boolean;
}
