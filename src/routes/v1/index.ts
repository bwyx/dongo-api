import { Router } from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
