import { Router } from 'express';
import helloRoutes from './helloRoutes';

const router = Router();

router.use('/hello', helloRoutes);

export default router;
