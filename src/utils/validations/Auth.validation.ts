import { body } from 'express-validator';

import { validate } from '@middlewares';

const authLoginValidation = [
  body('email').notEmpty().withMessage('Email is required!'),
  body('email').isEmail().withMessage('Email is not valid!'),
  body('password').notEmpty().withMessage('Password is required!')
];

const authRegisterValidation = [
  body('username').notEmpty().withMessage('Username is required!'),
  body('email').notEmpty().withMessage('Email is required!'),
  body('email').isEmail().withMessage('Email is not valid!'),
  body('password').notEmpty().withMessage('Password is required!')
];

export const AuthLoginValidation = validate(authLoginValidation);
export const AuthRegisterValidation = validate(authRegisterValidation);
