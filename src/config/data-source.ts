import { DataSource } from "typeorm";
import { env } from "./env";
import { Example } from "../modules/example/entities/Example";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: env.NODE_ENV === "development",
  entities: [Example],
});
