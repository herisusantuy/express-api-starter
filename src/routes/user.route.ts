import express from 'express';

import { UserController } from '@controllers';

const userRouter = express.Router();

userRouter.post('/', UserController.create);

export default userRouter;
