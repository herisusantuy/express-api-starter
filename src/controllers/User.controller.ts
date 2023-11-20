import { Request, Response } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { MongooseError } from 'mongoose';

import { User } from '@models';

class UserController {
  constructor() {}

  create = async (req: Request, res: Response) => {
    const { username, email, password, isAdmin } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already registered!');

    const hashedPassword = await bcrypt.hash(
      password,
      process.env.PASSWORD_SALT ? Number(process.env.PASSWORD_SALT) : 10
    );

    user = new User({ username, email, password: hashedPassword, isAdmin });

    try {
      await user.save();
      res.send({
        code: 200,
        message: 'Successfully create user!',
        data: _.pick(user, ['_id', 'username', 'email', 'isAdmin'])
      });
    } catch (error) {
      if (error instanceof MongooseError) {
        res.status(400).send({
          message: error.message
        });
      } else {
        res.status(400).send({
          message: 'User already exist!'
        });
      }
    }
  };
}

export default new UserController();
