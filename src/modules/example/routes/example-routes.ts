import express from "express";
import { ExampleController } from "../controllers/example-controller";

const router = express.Router();

const exampleController = new ExampleController();

router.post("/create", (req, res) => exampleController.create(req, res));

router.get("/list", (req, res) => exampleController.list(req, res));

export default router;
