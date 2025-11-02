import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

interface JwtPayload {
  id: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: decoded.id, role: decoded.role }; // attach user to req
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};


