import express from 'express';
import projectRoute from './project.route';
import userRoute from './user.route';
import authRoute from './auth.route';
import serviceRoute from './service.route';

export const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/projects', projectRoute);
router.use('/services', serviceRoute);
