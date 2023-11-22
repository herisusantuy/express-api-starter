import express from 'express';

import { ServiceController } from '@controllers';
import { protect } from '@middlewares';

const serviceRoute = express.Router();

serviceRoute
  .route('/')
  .get(protect, ServiceController.getAll)
  .post(protect, ServiceController.create);

serviceRoute
  .route('/:id')
  .get(protect, ServiceController.get)
  .delete(protect, ServiceController.delete)
  .put(protect, ServiceController.update);

export default serviceRoute;
