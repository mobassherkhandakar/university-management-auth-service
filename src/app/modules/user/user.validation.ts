import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required tai dite hobe',
    }),
    passaword: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
