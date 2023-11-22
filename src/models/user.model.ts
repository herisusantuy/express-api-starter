import mongoose, { Schema, model } from 'mongoose';
import Joi, { ValidationError } from 'joi';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { IUser } from '@interfaces';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    min: 3,
    max: 20,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    max: 1024,
    min: 5
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY as string);
  return token;
};

const userValidationSchema = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(5),
  isAdmin: Joi.boolean(),
  createdAt: Joi.date()
});

userSchema.pre('save', async function (next) {
  try {
    if (Object.keys(this.toObject()).length === 0) {
      throw new Error('Request body is empty!');
    }
    const newUser = _.omit(this.toObject(), ['_id']);
    await userValidationSchema.validateAsync(newUser);
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      const err = new Error(error.details.map(d => d.message).toString());
      next(err);
    } else {
      const err = new Error('Something went wrong!');
      next(err);
    }
  }
});

const User = model<IUser>('User', userSchema); 

export default User;
