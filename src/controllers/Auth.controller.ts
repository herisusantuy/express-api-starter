import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { User } from '@models';

class Auth {
  constructor() {}
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatched = await bcrypt.compare(password, user!.password);
      if (!isMatched) {
        return res.status(401).send({
          code: 401,
          message: 'Unauthorized user!'
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as string);
      return res.send({
        code: 200,
        message: 'Successfully login!',
        token
      });
    } else {
      return res.status(404).send({
        code: 404,
        message: 'User not found!'
      });
    }
  };

  register = async (req: Request, res: Response) => {
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
      res.status(400).send({
        message: 'User already exist!'
      });
    }
  };
}

export default new Auth();
