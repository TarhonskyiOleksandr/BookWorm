import React from 'react';

import { LoginForm } from '@/features/auth/LoginForm';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

export default SignInPage;
