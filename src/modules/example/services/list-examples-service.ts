import { Example } from "../entities/Example";
import { ExampleRepository } from "../repositories/example-repository";

export class ListExamplesService {
  async execute(): Promise<Example[]> {
    const examples = await ExampleRepository.find({ order: { createdAt: "DESC" } });

    return examples;
  }
}
