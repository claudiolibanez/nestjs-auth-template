import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),

  DATASOURCE: z.enum(['typeorm', 'prisma', 'memory']),
});

export type Env = z.infer<typeof envSchema>;
