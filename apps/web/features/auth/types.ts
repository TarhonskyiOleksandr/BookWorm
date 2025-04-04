import { z } from "zod";

export type FormState = {
  error?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
} | null

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long.',
    })
    .trim(),
  email: z
    .string()
    .email({ message: 'Invalid email.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 6 characters long' })
    .trim(),
});
