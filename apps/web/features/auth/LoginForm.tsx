'use client'
import React from 'react';

import { SubmitButton } from '@/shared/ui';

export const LoginForm = () => {
  return (
    <form className="flex flex-col">
      <label htmlFor="email">Your email</label>
      <input
        name="email"
        id="email"
      />

      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        id="password"
      />

      <SubmitButton>
        Login
      </SubmitButton>
    </form>
  );
}
