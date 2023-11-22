import { Request, Response, NextFunction } from 'express';
import { Service } from '@models';

class ServiceController {
  constructor() {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    let service = await Service.findOne({ name });
    if (service) {
      return res.status(400).json({ message: 'Service already exists' });
    }

    service = new Service(req.body);
    await service.save();

    res.status(201).send({
      code: 201,
      message: 'Service created successfully',
      data: service
    });
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const services = await Service.find();
    res.send({
      code: 200,
      message: 'Services fetched successfully',
      data: services
    });
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(400).send({ code: 400, message: 'Service not found' });
    }
    res.send({
      code: 200,
      message: 'Service fetched successfully',
      data: service
    });
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(400).send({ code: 400, message: 'Service not found' });
    }
    res.send({
      code: 200,
      message: 'Service deleted successfully',
      data: service
    });
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.send({
      code: 200,
      message: 'Service updated successfully',
      data: service
    });
  };
}

export default new ServiceController();
