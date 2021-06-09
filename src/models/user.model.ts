/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import roles from '../config/roles';

import { IUserDocument, IUserModel } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema<IUserDocument>(
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
      select: false,
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
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_doc, ret: any): void => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        delete ret.updatedAt;
        delete ret.createdAt;
      },
    },
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User;
