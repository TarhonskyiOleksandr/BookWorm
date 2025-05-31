import { getSession } from '@/lib/session';
import React from 'react';

async function Dashboard() {
  const session = await getSession();

  console.log(session);

  return (
    <div>
      Dashboard
    </div>
  );
}

export default Dashboard;
