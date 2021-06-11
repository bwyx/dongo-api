import httpStatus from 'http-status';
import Joi, { Context } from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ApiError, pick } from '../utils';

const validate =
  (schema: Context) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req as Context, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object, {
        abortEarly: false,
      });

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };

export default validate;
