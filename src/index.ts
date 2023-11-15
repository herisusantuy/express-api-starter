import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

const envUrl = process.env.NODE_ENV
  ? path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
  : path.resolve(__dirname, `../.env`);
dotenv.config({
  path: envUrl
});

import { Database } from './configs/index';
import { router } from './routes/';

const app = express();
const PORT = process.env.PORT || 3000;
const database = new Database();

database.connect();

app.use(
  cors({
    origin: '*'
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Something went wrong!');
});

app.get('/', (req: Request, res: Response) =>
  res.send('Hello Typescript Express MongoDB!')
);
app.use('/api/', router);

app.listen(PORT, () =>
  console.log(`Server running att http://localhost:${PORT}`)
);

process.on('SIGINT', () => {
  database.disconnect();
  process.exit();
});
