import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export function validateMiddleware(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return res.status(400).json({ error: message });
    }

    req.body = result.data;
    next();
  };
}
