import { paragraph, titleFont } from "@/config/fonts";
import Link from "next/link";
import styles from './not-found.module.css';

const headingClasses = [titleFont.className, styles.heading].join(' ');
const linkClasses = [paragraph.className, styles.btnLink].join(' ');

const NotFoundPage = () => {

  return (
    <>
      <h1 className={headingClasses}>
        404 Not Found
      </h1>

      <div className={styles.btnBox}>
        <Link href="/" className={linkClasses}>
          back home
        </Link>
      </div>
    </>
  );

};

export default NotFoundPage;
