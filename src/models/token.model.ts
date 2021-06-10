import { Schema, SchemaTypes, Model, model } from 'mongoose';
import tokenTypes from '../config/tokens';

import { TokenDocument } from '../interfaces/token.interface';

const tokenSchema = new Schema<TokenDocument>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
      expires: 0,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<TokenDocument, Model<TokenDocument>>('Token', tokenSchema);
