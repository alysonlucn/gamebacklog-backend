import express, { Request, Response } from "express";
import exampleRoutes from "./modules/example/routes/example-routes";
import authRoutes from "./modules/users/routes/auth-routes";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/examples", exampleRoutes);
  app.use("/auth", authRoutes);

  return app;
}
