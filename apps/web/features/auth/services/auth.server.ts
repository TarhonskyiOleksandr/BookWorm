'use server'
import { redirect } from 'next/navigation';
import {
  FormState,
  SignupFormSchema,
  LoginFormSchema,
} from '../types';
import { createSession } from '@/lib/session';

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    agree: formData.get('agree') === 'on',
  });

  if (!validatedFields.success) return {
    error: validatedFields.error.flatten().fieldErrors,
    values: Object.fromEntries(formData),
  };

  const {confirmPassword, agree, ...fields} = validatedFields.data;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });
  const data = await res.json();

  if (!res.ok) return data;

  redirect('/sign-in');
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

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

  const result = await res.json();

  if (res.ok) {
    await createSession(result.data);
    redirect('/dashboard');
  } else {
    return result;
  }
}

export const refreshToken = async (
  oldRefreshToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token-refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: oldRefreshToken,
        }),
      }
    );

    const { accessToken, refreshToken } = await response.json();

    const updateRes = await fetch(
      '/auth/update',
      {
        method: 'POST',
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );
    if (!updateRes.ok)
      throw new Error('Failed to update the tokens');

    return accessToken;
  } catch (err) {
    console.error('Refresh Token failed', err);
    return null;
  }
};
