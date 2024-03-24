import { paragraph, titleFont } from "@/config/fonts";
import Link from "next/link";
import styles from './not-found.module.css';
import Image from 'next/image';

const headingClasses = [titleFont.className, styles.heading].join(' ');
const messageClasses = [paragraph.className, styles.message].join(' ');
const linkClasses = [paragraph.className, styles.link].join(' ');

type Props = {
  name?: string;
};

const NotFound: React.FC<Readonly<Props>> = ({ name }) => {

  return (
    <div className={styles.container}>
      <section className={styles.infoBox}>
        <h1 className={headingClasses}>404</h1>

        <p className={messageClasses}>Woops! we&apos;re sorry.</p>

        <Link href="/" className={linkClasses}>
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
