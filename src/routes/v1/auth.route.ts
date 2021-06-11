import express from 'express';
import { auth, validate } from '../../middlewares';
import { authValidation } from '../../validations';
import { authController } from '../../controllers';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

router.get('/profile', auth(), authController.getProfile);

export default router;
