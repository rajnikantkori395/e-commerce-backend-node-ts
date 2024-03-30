import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

// Define a custom interface that extends the Express Request interface
interface CustomRequest extends Request {
  user?: any; // Add the 'user' property to the interface
}

// Middleware function to verify JWT token
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Get the JWT token from the request headers
  const token = req.headers['authorization']?.split(' ')[1];

  // If token is not provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, config.jwtSecret);
    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    // If token verification fails, return 401 Unauthorized
    res.status(401).json({ message: 'Invalid token' });
  }
};
