import express from 'express';
import { auth, validate } from '../../middlewares';
import { userValidation } from '../../validations';
import { userController } from '../../controllers';

const router = express.Router();

router.route('/').post(validate(userValidation.createUser), userController.createUser).get(userController.getAllUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

export default router;
