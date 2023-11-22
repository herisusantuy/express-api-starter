import express from 'express';

import { ProjectController } from '@controllers';
import { protect } from '@middlewares';

const projectRoute = express.Router();

projectRoute
  .route('/')
  .get(protect, ProjectController.getAll)
  .post(protect, ProjectController.create);

projectRoute
  .route('/:id')
  .get(protect, ProjectController.get)
  .delete(protect, ProjectController.delete)
  .put(protect, ProjectController.update);

export default projectRoute;
