import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).json({ error: "token is required" });
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return response.status(401).json({ error: "invalid token format" });
  }

  try {
    const payload = verifyToken(token);
    request.userId = payload.sub;
    request.userEmail = payload.email;
    return next();
  } catch {
    return response.status(401).json({ error: "invalid or expired token" });
  }
}
