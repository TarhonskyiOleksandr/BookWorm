import React from 'react';
import Image from 'next/image';

import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className="container flex items-center">
        <Image 
          src="/logos/logo_worm.svg"
          alt="Book warm"
          width={101}
          height={64}
        />
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
      </nav>
    </div>
  );
}

export default Header;