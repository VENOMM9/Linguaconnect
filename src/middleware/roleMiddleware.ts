import { Request, Response, NextFunction } from "express";

/**
 * Middleware to authorize users based on roles.
 * @param roles Array of allowed roles (e.g., ["admin", "tutor"])
 */
export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Make sure req.user exists (set by auth middleware)
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    // Check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }

    // User is authorized
    next();
  };
};
