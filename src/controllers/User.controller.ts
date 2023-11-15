import { Request, Response } from 'express';

import { User } from '../models/';

class UserController {
  constructor() {}

  create = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already registered!');
    user = new User({ username, email, password });

    await user.save();

    res.send(user);
  };
}

export default new UserController();
