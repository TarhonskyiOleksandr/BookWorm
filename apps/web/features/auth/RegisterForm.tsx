import React from 'react';

import styles from "./register-form.module.css";

export const RegisterForm = () => {
  return (
    <form className={styles.register}>
      <label>
        Your email
      </label>
      <input />
      <label>
        Your name
      </label>
      <input />
      <label>
        Password
      </label>
      <input type="password" />
      <label>
        Confirm password
      </label>
      <input type="password" />
      <div>
        <input type="checkbox" />
        <p>I agree to the Terms & Conditions and Privacy Policy</p>
      </div>
      <button type="submit">
        Create an account
      </button>
    </form>
  );
}
