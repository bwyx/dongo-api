import { Document } from 'mongoose';

export interface IToken {
  token: string;
  user: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}

export interface TokenDocument extends IToken, Document {}

export interface TokenResponse {
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}

export interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}
