import { IUser } from '@interfaces';
import { User } from '@models';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export type CustomRequest = Request & {
  isAdmin?: boolean;
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = '';
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return res.status(401).send({
      code: 401,
      message: 'Access denied. No token provided!'
    });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
    const user = await User.findById(decoded?._id);
    (req as CustomRequest).isAdmin = user!.isAdmin;
    next();
  } catch (error) {
    console.log('error:', error);
    next(new Error('Unauthorized to access route!'));
  }
}; 
