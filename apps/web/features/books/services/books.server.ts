'use server'

import { getSession } from "@/lib/session";

export const getPopularBooks = async () => {
  try {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/popular`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${session?.accessToken}`
        },
      }
    );
    const resJson = await response.json();
    console.log(resJson, '**** GET BOOKS **** ')
  } catch (err) {
    console.error('Refresh Token failed', err);
    return null;
  }
};
