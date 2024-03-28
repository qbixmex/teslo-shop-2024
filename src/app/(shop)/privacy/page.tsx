import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teslo Shop - Privacy",
  description: "Policy on how we handle your data",
  robots: "noindex, nofollow",
};

const PrivacyPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>
        Privacy
      </h1>
      <p className={styles.paragraph}>
        Policy on how we handle your data.
      </p>
    </div>
  );
};

export default PrivacyPage;
