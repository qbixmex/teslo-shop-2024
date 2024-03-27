"use client";

import Link from "next/link";
import styles from "./top-menu.module.css";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useUIStore } from "@/store";

type Props = {};

const TopMenu: React.FC<Readonly<Props>> = () => {
  const openSideMenu = useUIStore((store) => store.openSideMenu);

  return (
    <nav className={styles.navigation}>
      {/* Logo */}
      <section>
        <Link href="/" className={styles.logo}>
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
          href="/category/women"
          className={`${false ? styles.linkActive : ''} ${styles.links}`}
        >Woman</Link>

        <Link
          href="/category/kid"
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
          onClick={openSideMenu}
        >Menu</button>
      </section>
    </nav>
  );

};

export default TopMenu;
