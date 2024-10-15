import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const protectRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized, No token Found" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || typeof decoded === 'string') {
      res.status(401).json({ message: "Unauthorized, Invalid Token" });
      return;
    }

    // Await the result of User.findById to properly retrieve the user
    const user = await User.findById(decoded.userId).select("-password");
    console.log("user", user);

    if (!user) {
      res.status(401).json({ message: "Unauthorized, User not found" });
      return;
    }

    // Set the user on the request object
    req.user = user;
    next();

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default protectRoutes;
