import express, { NextFunction, Request, Response } from 'express';

import taskRoutes from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Something went wrong!');
});

app.get('/', (req: Request, res: Response) =>
  res.send('Hello Typescript Express!')
);
app.use('./tasks', taskRoutes);

app.listen(PORT, () =>
  console.log(`Server running att http://localhost:${PORT}`)
);
