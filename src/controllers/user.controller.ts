import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import userService from '../services/user.service';

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await userService.getAllUsers();
  res.send(allUsers);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
