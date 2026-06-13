import { Request, Response } from "express";
import { CreateExampleService } from "../services/create-example-service";
import { ListExamplesService } from "../services/list-examples-service";

export class ExampleController {
  async create(request: Request, response: Response) {
    const createExampleService = new CreateExampleService();

    try {
      const example = await createExampleService.execute(request.body);
      return response.status(201).json(example);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async list(_request: Request, response: Response) {
    const listExamplesService = new ListExamplesService();

    try {
      const examples = await listExamplesService.execute();
      return response.status(200).json(examples);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
