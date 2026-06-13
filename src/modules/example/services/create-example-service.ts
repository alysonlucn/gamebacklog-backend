import { Example } from "../entities/Example";
import { CreateExampleDto } from "../dtos/create-example-dto";
import { ExampleRepository } from "../repositories/example-repository";

export class CreateExampleService {
  async execute(data: CreateExampleDto): Promise<Example> {
    const example = ExampleRepository.create(data);

    await ExampleRepository.save(example);

    return example;
  }
}
