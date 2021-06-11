import passport from 'passport';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils';
import { roleRights } from '../config/roles';

const verifyCallback =
  (req: Request, resolve: (value: unknown) => void, reject: (reason?: unknown) => void, requiredRights: string[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, consistent-return
  async (err: any, user: any, info: any) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      let hasRequiredRights = false;

      const userRights = roleRights.get(user.role) || [];
      hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));

      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve(user);
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
