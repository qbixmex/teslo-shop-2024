"use client";

import { useEffect } from 'react';
import { IoClose, IoList, IoLogIn, IoLogOut, IoMan, IoPeople, IoPerson, IoSearch, IoShirt, IoTicket, IoWoman } from 'react-icons/io5';
import { FaChildren } from "react-icons/fa6";
import styles from './sidebar.module.css';
import Link from 'next/link';
import { paragraph } from '@/config/fonts';
import { useUIStore } from '@/store';
import clsx from 'clsx';

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
        <IoClose className={styles.closeIcon} onClick={closeSideMenu} />

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
            <IoPerson className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Profile</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoTicket className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Orders</span>
          </Link>
        </section>

        {/* Line Separator */}
        <div className={styles.separator} />

        <section className={styles.linksWrapper}>
          <Link href="/products" className={styles.link} onClick={closeSideMenu}>
            <IoShirt className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Products</span>
          </Link>

          <Link href="/category/men" className={styles.link} onClick={closeSideMenu}>
            <IoMan className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Men</span>
          </Link>

          <Link href="/category/women" className={styles.link} onClick={closeSideMenu}>
            <IoWoman className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Women</span>
          </Link>

          <Link href="/category/kid" className={styles.link} onClick={closeSideMenu}>
            <FaChildren className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Kids</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoPeople className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>For Everyone</span>
          </Link>

        </section>

        {/* Line Separator */}
        <div className={styles.separator} />

        <Link href="#" className={styles.link} onClick={closeSideMenu}>
          <IoList className={styles.linkIcon} />
          <span className={`${paragraph.className} ${styles.linkText}`}>Orders</span>
        </Link>

        <Link href="#" className={styles.link} onClick={closeSideMenu}>
          <IoPeople className={styles.linkIcon} />
          <span className={`${paragraph.className} ${styles.linkText}`}>Users</span>
        </Link>

        {/* Line Separator */}
        <div className={styles.separator} />

        {/* TODO: Show / Hide if user is authenticated */}
        {true ? (
            <Link href="#" className={styles.link} onClick={closeSideMenu}>
              <IoLogOut className={styles.linkIcon} />
              <span className={`${paragraph.className} ${styles.linkText}`}>Log-Out</span>
            </Link>
          ) : (
            <Link href="#" className={styles.link} onClick={closeSideMenu}>
              <IoLogIn className={styles.linkIcon} />
              <span className={`${paragraph.className} ${styles.linkText}`}>Log-In</span>
            </Link>
        )}
        {/* TODO END */}
      </nav>
    </section>
  );

};

export default Sidebar;
