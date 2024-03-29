import styles from './footer.module.css';
import Link from 'next/link';

const Footer = () => {

  return (
    <footer className={styles.container}>
      <span className={styles.copyright}>
        Teslo Shop &copy; { new Date().getFullYear() }
      </span>
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
      <Link href="/terms" className={styles.link}>Usage Terms</Link>
    </footer>
  );

};

export default Footer;
