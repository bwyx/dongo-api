import express from 'express';
import userController from '../../controllers/user.controller';

const router = express.Router();

router.route('/').post(userController.createUser).get(userController.getAllUsers);

router.route('/:userId').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

export default router;
