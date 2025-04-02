import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className="container flex items-center">
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
        <ul>
          <li>
            <Link href="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
