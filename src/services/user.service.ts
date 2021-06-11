import httpStatus from 'http-status';
import { ObjectId } from 'mongoose';

import { User } from '../models';
import { ApiError } from '../utils';
import { IUser, UserDocument } from '../interfaces/user.interface';

const createUser = async (userBody: IUser): Promise<UserDocument> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const getAllUsers = async (): Promise<UserDocument[] | null> => {
  return User.find();
};

const getUserById = async (id: ObjectId | string): Promise<UserDocument | null> => {
  return User.findById(id);
};

const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
  return User.findOne({ email });
};

const updateUserById = async (userId: ObjectId | string, updateBody: IUser): Promise<UserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId: ObjectId | string): Promise<UserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
