"use client";

import { IoCloseOutline, IoList, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearch, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { paragraph } from '@/config/fonts';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { useEffect } from 'react';

const Sidebar = () => {
  const isSideMenuOpen = useUIStore((store) => store.isSideMenuOpen);
  const closeSideMenu = useUIStore((store) => store.closeSideMenu);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSideMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeSideMenu]); // Re-run the effect when `closeSideMenu` changes

  return (
    <section>
      {isSideMenuOpen && (
        <>
          <div className={styles.blackBG} />
          <div className={`fade-in ${styles.blurBG}`} onClick={closeSideMenu} />
        </>
      )}

      <nav className={clsx(
        styles.nav,
        { [styles.closedMenu]: !isSideMenuOpen }
      )}>
        <IoCloseOutline className={styles.closeIcon} onClick={closeSideMenu} />

        <section className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search product ..."
          />
          <IoSearch className={styles.searchIcon} />
        </section>

        <section className={styles.linksWrapper}>
          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoPersonOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Profile</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoTicketOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Orders</span>
          </Link>

          {/* TODO: Show / Hide if user is authenticated */}
          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoLogInOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Log-In</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoLogOutOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Log-Out</span>
          </Link>
          {/* TODO END */}
        </section>

        {/* Line Separator */}
        <div className="w-full bg-slate-300 h-px my-10" />

        <section className={styles.linksWrapper}>
          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoShirtOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Products</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoList className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Orders</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoPeopleOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Users</span>
          </Link>
        </section>
      </nav>
    </section>
  );

};

export default Sidebar;
