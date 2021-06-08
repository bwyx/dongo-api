import { ObjectId } from 'mongoose';
import httpStatus from 'http-status';
import User from '../models/user.model';
import { IUser, IUserDocument } from '../interfaces/user.interface';
import ApiError from '../utils/ApiError';

const createUser = async (userBody: IUser): Promise<IUserDocument> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const getAllUsers = async (): Promise<IUserDocument[] | null> => {
  return User.find();
};

const getUserById = async (id: ObjectId | string): Promise<IUserDocument | null> => {
  return User.findById(id);
};

const getUserByEmail = async (email: string): Promise<IUserDocument | null> => {
  return User.findOne({ email });
};

const updateUserById = async (userId: ObjectId | string, updateBody: IUser): Promise<IUserDocument | null> => {
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

const deleteUserById = async (userId: ObjectId | string): Promise<IUserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
