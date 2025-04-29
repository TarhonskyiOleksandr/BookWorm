'use server'
import { redirect } from 'next/navigation';
import {
  FormState,
  SignupFormSchema,
  LoginFormSchema,
} from '../types';

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) return {
    error: validatedFields.error.flatten().fieldErrors,
    values: Object.fromEntries(formData),
  }

  const {confirmPassword, ...fields} = validatedFields.data;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });
  const data = await res.json();

  if (!res.ok) return { message: data.message };

  redirect('/sign-in');
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) return {
    error: validatedFields.error.flatten().fieldErrors,
    values: Object.fromEntries(formData),
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    const data = await res.json()
    return { message: data.message }
  }

  redirect('/');
}
