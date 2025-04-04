'use client'
import React, { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

export const SubmitButton: React.FC<PropsWithChildren> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </button>
  );
};
