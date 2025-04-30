import { z } from 'zod';

export type FormState = {
  error?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    agree?: string[];
  };
  message?: string;
  values?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agree?: boolean;
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
    .string(),
  agree: z
    .boolean()
    .refine(val => !!val, {
      message: 'You must accept the terms.',
    })
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
    .min(1, { message: 'Password is required' })
    .trim(),
});
