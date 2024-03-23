import { titleFont, paragraph } from '@/config/fonts';
import styles from './shop.module.css';

const headingClasses = `${titleFont.className} ${styles.heading}`;
const paragraphClasses = `${paragraph.className} ${styles.paragraph}`;

export const ShopPage = () => {
  return (
    <div>
      <h1 className={headingClasses}>
        Shop Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </div>
  );
};

export default ShopPage;
