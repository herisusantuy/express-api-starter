import express from 'express';
import projectRoute from './project.route';
import userRoute from './user.route';

export const router = express.Router();

router.use('/users', userRoute);
router.use('/projects', projectRoute);
