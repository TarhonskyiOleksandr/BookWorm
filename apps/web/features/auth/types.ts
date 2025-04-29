import { z } from 'zod';

export type FormState = {
  error?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  values?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
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
    .min(6, { message: 'Be at least 6 characters long' })
    .trim(),
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords don\'t match.',
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email.' })
    .trim(),
  password: z
    .string()
    .trim(),
});
