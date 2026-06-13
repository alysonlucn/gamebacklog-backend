import { z } from "zod";

export const createExampleSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  description: z.string().trim().optional(),
});

export type CreateExampleDto = z.infer<typeof createExampleSchema>;
