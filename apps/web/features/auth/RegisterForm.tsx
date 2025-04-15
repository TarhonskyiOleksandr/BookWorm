'use client'
import React from 'react';
import { useActionState } from 'react';

import styles from "./register-form.module.css";
import { SubmitButton } from '@/shared/ui';
import { signUp } from './services/auth.server';

export const RegisterForm = () => {
  const [state, action] = useActionState(signUp, null);

  return (
    <form className={styles.register} action={action}>
      <label htmlFor="email">Your email</label>
      <input
        name="email"
        defaultValue={state?.values?.email}
        id="email"
      />
      {state?.error?.email && (
        <p className={styles.error}>
          {state.error.email.join(', ')}
        </p>
      )}

      <label htmlFor="name">Your name</label>
      <input
        name="name"
        defaultValue={state?.values?.name}
        id="name"
      />
      {state?.error?.name && (
        <p className={styles.error}>
          {state.error.name.join(', ')}
        </p>
      )}

      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        defaultValue={state?.values?.password}
        id="password"
      />
      {state?.error?.password && (
        <p className={styles.error}>
          {state.error.password.join(', ')}
        </p>
      )}

      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        defaultValue={state?.values?.confirmPassword}
        id="confirmPassword"
      />
      {state?.error?.confirmPassword && (
        <p className={styles.error}>
          {state.error.confirmPassword.join(', ')}
        </p>
      )}

      <div>
        <input type="checkbox" />
        <p>I agree to the Terms & Conditions and Privacy Policy</p>
      </div>

      {state?.message && (
        <p className={styles.error}>
          {state.message}
        </p>
      )}

      <SubmitButton>
        Create an account
      </SubmitButton>
    </form>
  );
}
