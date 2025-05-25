'use client'
import React, { useActionState, useEffect } from 'react';
import { toast } from 'sonner'

import {
  SubmitButton,
  Input,
  Label,
} from '@/shared/ui';
import { login } from './services/auth.server';
import Link from 'next/link';

export const LoginForm = () => {
  const [state, action] = useActionState(login, null);

  useEffect(() => {
    if (state?.message) toast.error(state.message);
  }, [state]);

  return (
    <form
      className="flex flex-col w-full md:w-1/3 gap-4"
      action={action}
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">
          Your email
        </Label>
        <Input
          name="email"
          id="email"
          defaultValue={state?.values?.email}
        />
        {state?.error?.email && (
          <p className="error-text">
            {state.error.email.join(', ')}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">
          Password
        </Label>
        <Input
          name="password"
          type="password"
          id="password"
          defaultValue={state?.values?.password}
        />
        {state?.error?.password && (
          <p className="error-text">
            {state.error.password.join(', ')}
          </p>
        )}
      </div>
      <SubmitButton>
        Login
      </SubmitButton>
      <p className="text-sm text-center text-muted-foreground">
        Don&#39;t have an account?{' '}
        <Link href="/register" className="text-slate-700 underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </form>
  );
};
