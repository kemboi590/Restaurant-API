import { z } from "zod";

export const stateSchema = z.object({
  name: z.string(),
  code: z.string(),
});

