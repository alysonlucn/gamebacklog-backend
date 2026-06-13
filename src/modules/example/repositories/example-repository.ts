import { AppDataSource } from "../../../config/data-source";
import { Example } from "../entities/Example";

export const ExampleRepository = AppDataSource.getRepository(Example);
