import { z } from "zod";

export const zPerson = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  notes: z.string(),
});

export type Person = z.infer<typeof zPerson>;
