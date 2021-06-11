import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import passport from 'passport';
import httpStatus from 'http-status';

import jwtStrategy from './config/passport';
import v1Routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares';
import { ApiError } from './utils';

const app = express();

app.use(helmet()); // set security HTTP headers

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(xss()); // prevent a harmful script being sent with the request
app.use(hpp()); // prevent HTTP Parameter Pollution.
app.use(mongoSanitize()); // prevent NoSql injections
app.use(cors()); // enable cors

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', v1Routes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
