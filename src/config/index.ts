import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(15).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(15).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV as string,
  port: Number(envVars.PORT),
  mongoose: {
    url: envVars.MONGODB_URL as string,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET as string,
    accessExpirationMinutes: Number(envVars.JWT_ACCESS_EXPIRATION_MINUTES),
    refreshExpirationDays: Number(envVars.JWT_REFRESH_EXPIRATION_DAYS),
    resetPasswordExpirationMinutes: Number(envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES),
    verifyEmailExpirationMinutes: Number(envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES),
  },
};
