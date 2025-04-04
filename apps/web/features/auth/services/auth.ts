'use client'
import { redirect } from 'next/navigation';
import { FormState, SignupFormSchema } from '../types';

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) return {
    error: validatedFields.error.flatten().fieldErrors,
  }

  const res = await fetch(`http://localhost:8080/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });
  const data = await res.json();

  if (!res.ok) return { message: data.message };

  redirect('/');
}
