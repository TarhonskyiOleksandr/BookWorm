'use client'
import React from 'react';
import { useActionState } from 'react';

import { Checkbox, Input, Label, SubmitButton } from '@/shared/ui';
import { signUp } from '../services/auth.server';
import { cn } from '@/lib/utils';

export const RegisterForm = () => {
  const [state, action] = useActionState(signUp, null);

  return (
    <form className="flex flex-col gap-4 p-6 w-full md:w-1/3" action={action}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">
          Your email
        </Label>
        <Input
          name="email"
          defaultValue={state?.values?.email}
          id="email"
        />
        {state?.error?.email && (
          <p className="error-text">
            {state.error.email.join(', ')}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">
          Your name
        </Label>
        <Input
          name="name"
          defaultValue={state?.values?.name}
          id="name"
        />
        {state?.error?.name && (
          <p className="error-text">
            {state.error.name.join(', ')}
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
          defaultValue={state?.values?.password}
          id="password"
        />
        {state?.error?.password && (
          <p className="error-text">
            {state.error.password.join(', ')}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="confirmPassword">
          Confirm password
        </Label>
        <Input
          type="password"
          name="confirmPassword"
          defaultValue={state?.values?.confirmPassword}
          id="confirmPassword"
        />
        {state?.error?.confirmPassword && (
          <p className="error-text">
            {state.error.confirmPassword.join(', ')}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Checkbox
            name="agree"
            id="agree"
            defaultChecked={state?.values?.agree}
            className={cn(state?.error?.agree && 'border-red-500 ring-red-500')}
          />
          <Label htmlFor="agree" className="text-sm">
            I agree to the Terms & Conditions and Privacy Policy
          </Label>
        </div>
        {state?.error?.agree && (
          <p className="text-sm text-red-500">{state.error.agree.join(', ')}</p>
        )}
      </div>
      {state?.message && (
        <p className="error-text">
          {state.message}
        </p>
      )}
      <SubmitButton>
        Create an account
      </SubmitButton>
    </form>
  );
}
