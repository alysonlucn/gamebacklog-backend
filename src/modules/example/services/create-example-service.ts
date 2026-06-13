import { Example } from "../entities/Example";
import { CreateExampleDto } from "../dtos/create-example-dto";
import { ExampleRepository } from "../repositories/example-repository";

export class CreateExampleService {
  async execute(data: unknown): Promise<Example> {
    const body = data as Record<string, unknown>;

    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      throw new Error("name is required");
    }

    const validatedData: CreateExampleDto = {
      name: body.name.trim(),
      description:
        typeof body.description === "string"
          ? body.description.trim()
          : undefined,
    };

    const example = ExampleRepository.create(validatedData);

    await ExampleRepository.save(example);

    return example;
  }
}
