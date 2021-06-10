import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import { ObjectId } from 'mongoose';
import config from '../config';
import Token from '../models/token.model';
import tokenTypes from '../config/tokens';

import { TokenDocument, TokenResponse, TokenPayload, UserDocument } from '../interfaces';

const generateToken = (userId: ObjectId, expires: Moment, type: string, secret: string = config.jwt.secret): string => {
  const payload: TokenPayload = {
    sub: userId.toString(),
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: Moment,
  type: string,
  blacklisted = false
): Promise<TokenDocument> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token: string, type: string): Promise<TokenDocument> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = jwt.verify(token, config.jwt.secret) as TokenPayload;

  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user: UserDocument): Promise<TokenResponse> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
