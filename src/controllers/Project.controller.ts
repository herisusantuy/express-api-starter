import { Request, Response } from 'express';
import { Project } from '@models';
class ProjectController {
  constructor() {}
  create = async (req: Request, res: Response) => {
    const { title, description, technologies, type } = req.body;
    let project = await Project.findOne({ title });

    if (project) {
      return res.status(400).send({
        code: 400,
        message: 'Project already exist!'
      });
    }
    project = new Project({ title, description, technologies, type });
    try {
      await project.save();
      return res.send({
        code: 200,
        message: 'Successfully create project!'
      });
    } catch (error) {
      return res.send({
        code: 400,
        message: 'Failed create project!'
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    const projects = await Project.find();
    return res.send({
      code: 200,
      message: 'Successfully get projects!',
      data: projects
    });
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(400).send({
        code: 400,
        message: 'Project not found!'
      });
    }
    return res.send({
      code: 200,
      message: 'Successfully get project!',
      data: project
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.send({
        code: 400,
        message: 'Project not found!'
      });
    }
    return res.send({
      code: 200,
      message: 'Successfully delete project!'
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!project) {
      return res.send({
        code: 400,
        message: 'Project not found!'
      });
    }
    return res.send({
      code: 200,
      message: 'Successfully update project!',
      data: project
    });
  };
}

export default new ProjectController();
