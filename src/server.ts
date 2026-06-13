import "reflect-metadata";
import { env } from "./config/env";
import { AppDataSource } from "./config/data-source";
import { createApp } from "./app";

async function bootstrap() {
  await AppDataSource.initialize();
  console.log("Database connected");

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
