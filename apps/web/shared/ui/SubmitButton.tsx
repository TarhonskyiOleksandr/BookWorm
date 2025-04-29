'use client'
import React, { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from './button';

export const SubmitButton: React.FC<PropsWithChildren> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
    >
      {pending ? 'Loading...' : children}
    </Button>
  );
};
