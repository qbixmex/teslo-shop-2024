import { titleFont, paragraph } from '@/config/fonts';
import styles from './shop.module.css';

const headingClasses = `${titleFont.className} ${styles.heading}`;
const paragraphClasses = `${paragraph.className} ${styles.paragraph}`;

const AuthPage = () => {
  return (
    <div className={styles.main}>
      <h1 className={headingClasses}>
        Auth Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </div>
  );
}

export default AuthPage;
