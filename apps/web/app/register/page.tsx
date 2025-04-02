import React from 'react';

import styles from "./register.module.css";
import { RegisterForm } from '@/features'

const Register = () => {
  return (
    <div className={styles.register}>
      <div></div>
      <RegisterForm />
    </div>
  );
};

export default Register;
