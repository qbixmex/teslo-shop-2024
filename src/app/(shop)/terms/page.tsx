import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Terms of service",
  description: "Terms of service for using Teslo Shop",
  robots: "noindex, nofollow",
};

const TermsPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Terms Page
      </h1>
      <p className={styles.paragraph}>
        Terms of service for using Teslo Shop.
      </p>
    </div>
  );
};

export default TermsPage;
