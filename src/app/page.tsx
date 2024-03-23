import { titleFont, paragraph } from '@/config/fonts';
import styles from './home.module.css';

const headingClasses = `${titleFont.className} ${styles.heading}`;
const paragraphClasses = `${paragraph.className} ${styles.paragraph}`;

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={headingClasses}>
        Welcome to Teslo Shop
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </main>
  );
}
