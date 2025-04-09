'use client'
import React from 'react';
import { useActionState } from 'react';

import styles from "./register-form.module.css";
import { SubmitButton } from '@/shared/ui';
import { signUp } from './services/auth.server';

export const RegisterForm = () => {
  const [state, action] = useActionState(signUp, null);
  console.log(state)
  return (
    <form
      className={styles.register}
      action={action}
    >
      <label htmlFor="email">
        Your email
      </label>
      <input
        name="email"
        defaultValue={state?.values?.email}
        id="email"
      />
      <label htmlFor="name">
        Your name
      </label>
      <input
        name="name"
        defaultValue={state?.values?.name}
        id="name"
      />
      <label htmlFor="password">
        Password
      </label>
      <input
        name="password"
        type="password"
        defaultValue={state?.values?.password}
        id="password"
      />
      <label htmlFor="confirmPassword">
        Confirm password
      </label>
      <input
        type="password"
        name="confirmPassword"
        defaultValue={state?.values?.confirmPassword}
        id="confirmPassword"
      />
      <div>
        <input type="checkbox" />
        <p>I agree to the Terms & Conditions and Privacy Policy</p>
      </div>
      <SubmitButton>
        Create an account
      </SubmitButton>
    </form>
  );
}
