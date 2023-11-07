import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { Task } from '../models/task';

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required!'),
  body('description').notEmpty().withMessage('Description is required!'),
  body('completed').notEmpty().withMessage('Completed is required')
];

router.post('/', taskValidationRules, (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const task: Task = {
    id: tasks.length + 1,
    title,
    description,
    completed
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.get('/', (req: Request, res: Response) => {
  res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    res.status(404).send('Task not found!');
  }
  res.json(task);
});

router.put('/:id', taskValidationRules, (req: Request, res: Response) => {
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    res.status(404).send('Task not found!');
  }
  task!.title = title || task?.title;
  task!.description = description || task?.description;
  task!.completed = completed || task?.completed;

  res.json(task);
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index: any = tasks.find(t => t.id === parseInt(id));

  if (index === -1) {
    res.status(404).send('Task not found');
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

export default router;
