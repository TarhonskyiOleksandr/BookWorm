import Link from 'next/link';

import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Oops...
        </h1>
        <p className={styles.text}>
          It seems that you are lost...don&apos;t worry.
        </p>
        <p className={styles.text}>
          Let us help guide you out and get back home.
        </p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
};

export default NotFound;
