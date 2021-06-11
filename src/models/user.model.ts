/* eslint-disable no-param-reassign */
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { Schema, ObjectId, model } from 'mongoose';

import toJSON from './plugins/toJSON';
import { roles } from '../config/roles';
import { UserDocument, UserModel } from '../interfaces';

const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
      private: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId: ObjectId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.plugin(toJSON);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export default model<UserDocument, UserModel>('User', userSchema);
