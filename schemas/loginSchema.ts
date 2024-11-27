import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, { message: 'Informe seu e-mail' }),
  password: z.string().min(1, { message: 'Informe sua senha' }),
});
