import { titleFont, paragraph } from '@/config/fonts';
import styles from './page.module.css';

const headingClasses = [titleFont.className, styles.heading].join(' ');
const paragraphClasses = [paragraph.className, styles.paragraph].join(' ');

export const AdminPage = () => {
  return (
    <div>
      <h1 className={headingClasses}>
        Admin Page
      </h1>
      <p className={paragraphClasses}>
        This website is under construction
      </p>
    </div>
  );
};

export default AdminPage;
