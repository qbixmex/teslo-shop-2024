"use client";

import Link from "next/link";
import styles from "./top-menu.module.css";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useUIStore } from "@/store";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {};

const TopMenu: React.FC<Readonly<Props>> = () => {

  //* Only works on client components
  const pathname = usePathname();

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
          href="/gender/men"
          className={ clsx(styles.links, { [styles.linkActive]: pathname === "/gender/men" }) }
        >Men</Link>

        <Link
          href="/gender/women"
          className={ clsx(styles.links, { [styles.linkActive]: pathname === "/gender/women" }) }
        >Woman</Link>

        <Link
          href="/gender/kid"
          className={ clsx(styles.links, { [styles.linkActive]: pathname === "/gender/kid" }) }
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
