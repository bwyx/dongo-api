import { Document, Model, ObjectId } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export interface UserDocument extends IUser, Document {
  isPasswordMatch: (password: string) => boolean;
}

export interface UserModel extends Model<UserDocument> {
  isEmailTaken: (email: string, excludeUserId?: ObjectId | string) => boolean;
}
