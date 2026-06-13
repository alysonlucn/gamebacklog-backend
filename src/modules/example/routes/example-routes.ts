import express from "express";
import { validateMiddleware } from "../../../shared/middlewares/validate-middleware";
import { ExampleController } from "../controllers/example-controller";
import { createExampleSchema } from "../dtos/create-example-dto";

const router = express.Router();

const exampleController = new ExampleController();

router.post(
  "/create",
  validateMiddleware(createExampleSchema),
  (req, res) => exampleController.create(req, res),
);

router.get("/list", (req, res) => exampleController.list(req, res));

export default router;
