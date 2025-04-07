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
      <label>
        Your email
      </label>
      <input name="email" />
      <label>
        Your name
      </label>
      <input name="name" />
      <label>
        Password
      </label>
      <input
        name="password"
        type="password"
      />
      <label>
        Confirm password
      </label>
      <input
        type="password"
        name="confirmPassword"
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
