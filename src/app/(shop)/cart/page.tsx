import { titleFont, paragraph } from '@/config/fonts';
import styles from './page.module.css';

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');

export const CartPage = () => {
  return (
    <div>
      <h1 className={headingClasses}>
        Cart Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </div>
  );
};

export default CartPage;
