import { Router } from 'express';
import helloController from '../../controllers/helloController';

const router = Router();

router.get('/:world', helloController.getWorld);

export default router;
