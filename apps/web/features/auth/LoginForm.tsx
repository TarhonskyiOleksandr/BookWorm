'use client'
import React, { useActionState } from 'react';

import { SubmitButton } from '@/shared/ui';
import { login } from './services/auth.server';

export const LoginForm = () => {
  const [state, action] = useActionState(login, null);
  console.log(state)
  return (
    <form
      className="flex flex-col"
      action={action}
    >
      <label htmlFor="email">Your email</label>
      <input
        name="email"
        id="email"
        defaultValue={state?.values?.email}
      />
      {state?.error?.email && (
        <p className="error-text">
          {state.error.email.join(', ')}
        </p>
      )}

      <label htmlFor="password">Password</label>
      <input
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

      <SubmitButton>
        Login
      </SubmitButton>
    </form>
  );
};
