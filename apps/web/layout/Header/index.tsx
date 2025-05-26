import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.css';
import UserMenu from '@/features/auth/ui/UserMenu';

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className="container flex items-center justify-between">
        <div className="flex">
          <Link href="/">
            <Image
              src="/logos/logo_worm.svg"
              alt="Book warm"
              width={101}
              height={64}
            />
          </Link>
          <ul className={styles.navigation}>
            <li>
              All books
            </li>
            <li>
              Genres
            </li>
            <li>
              Community
            </li>
          </ul>
        </div>
        <UserMenu />
      </nav>
    </div>
  );
}

export default Header;
