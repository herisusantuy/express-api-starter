import { Schema, model } from 'mongoose';
import Joi, { ValidationError } from 'joi';

import { IUser } from '../interfaces';

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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userValidationSchema = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(5).max(10)
});

userSchema.pre('save', async (next): Promise<void> => {
  try {
    await userValidationSchema.validateAsync(this);
    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      next(new Error(error.message));
    } else {
      const err = new Error('Something went wrong!');
      next(err);
    }
  }
});

const User = model<IUser>('User', userSchema);

export default User;
