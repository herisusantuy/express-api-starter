import express from 'express';

import { AuthController } from '@controllers';
import { AuthLoginValidation, AuthRegisterValidation } from '@validations';

const authRouter = express.Router();

authRouter.post('/login', AuthLoginValidation, AuthController.login);
authRouter.post('/register', AuthRegisterValidation, AuthController.register);

export default authRouter;
