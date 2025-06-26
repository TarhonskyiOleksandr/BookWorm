import React from 'react';
import { getPopularBooks } from '../services/books.server';

export const PopularBooksList = async() => {
  await getPopularBooks();

  return (
    <div>

    </div>
  );
};
