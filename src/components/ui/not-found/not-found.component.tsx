import Link from "next/link";
import styles from './not-found.module.css';
import Image from 'next/image';

type Props = {
  name?: string;
};

const NotFound: React.FC<Readonly<Props>> = ({ name }) => {

  return (
    <div className={styles.container}>
      <section className={styles.infoBox}>
        <h1 className={styles.heading}>404</h1>

        <p className={styles.message}>Woops! we&apos;re sorry.</p>

        <Link href="/" className={styles.link}>
          back home
        </Link>
      </section>

      <section className={styles.imageBox}>
        <Image
          src="/images/starman_750x750.png"
          width={550}
          height={550}
          alt="Starman in space"
          className={styles.image}
        />
      </section>

    </div>
  );

};

export default NotFound;
