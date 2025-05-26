import React from 'react';
import Link from 'next/link';

import { getSession } from '@/lib/session';
import { Button } from '@/shared/ui/button';

export const UserMenu = async() => {
  const session = await getSession();

  if (session?.user?.email) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-400" />
        <span className="text-sm">{session.user.name}</span>
        <Button
          asChild
          variant="outline"
          size="sm"
        >
          <Link href="/api/auth/logout">
            Logout
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        asChild
        variant="outline"
        size="sm"
      >
        <Link href="/sign-in">
          Login
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="sm"
      >
        <Link href="/register">
          Register
        </Link>
      </Button>
    </div>
  );
}

export default UserMenu;
