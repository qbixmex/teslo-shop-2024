import { titleFont, paragraph } from "@/config/fonts";
import Link from "next/link";
import styles from "./top-menu.module.css";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

type Props = {};

const navigationClasses = [paragraph.className, styles.navigation].join(' ');
const linkClasses = [titleFont.className, styles.logo].join(' ');

const TopMenu: React.FC<Readonly<Props>> = () => {

  return (
    <nav className={navigationClasses}>
      {/* Logo */}
      <section>
        <Link href="/" className={linkClasses}>
          <span>Teslo</span>&nbsp;
          <span>| Shop</span>
        </Link>
      </section>

      {/* Center Menu */}
      <section className={styles.centerLinks}>
        <Link
          href="/category/men"
          className={`${true ? styles.linkActive : ''} ${styles.links}`}
        >Men</Link>

        <Link
          href="/category/woman"
          className={`${false ? styles.linkActive : ''} ${styles.links}`}
        >Woman</Link>

        <Link
          href="/category/kids"
          className={`${false ? styles.linkActive : ''} ${styles.links}`}
        >Kids</Link>
      </section>

      {/* Icons */}
      <section className={styles.icons}>
        <Link
          href="/search"
          className={""}
        >
          <IoSearchOutline className="size-5" />
        </Link>

        <Link
          href="/cart"
          className={""}
        >
          <div className={styles.boxChip}>
            <span className={styles.chip}>5</span>
            <IoCartOutline className="size-5" />
          </div>
        </Link>

        {/* Menu Button */}
        <button
          type="button"
          className={styles.menuBtn}
        >Menu</button>
      </section>
    </nav>
  );

};

export default TopMenu;
