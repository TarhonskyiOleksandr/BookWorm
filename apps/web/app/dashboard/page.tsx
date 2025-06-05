import { PopularBooksList } from '@/features/books';
import { getSession } from '@/lib/session';
import React from 'react';

async function Dashboard() {
  const session = await getSession();

  console.log(session);

  return (
    <div>
      Dashboard
      <PopularBooksList />
    </div>
  );
}

export default Dashboard;
