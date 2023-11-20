import { IUser } from '@interfaces';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).send('Access denied. No token provided!');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    (req as CustomRequest).token = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token!');
  }
};

export const authorize = (user: IUser) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!user.isAdmin) {
      return next(new Error('Not authorize!'));
    }
    next();
  };
};
