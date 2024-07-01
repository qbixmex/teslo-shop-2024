"use client";

import { useEffect } from 'react';
import {
  IoClose, IoList, IoLogIn, IoLogOut,
  IoMan, IoPeople, IoPerson, IoSearch,
  IoShirt, IoTicket, IoWoman,
} from 'react-icons/io5';
import { FaChildren } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useUIStore } from '@/store';
import { logout } from '@/actions';
import clsx from 'clsx';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const isSideMenuOpen = useUIStore((store) => store.isSideMenuOpen);
  const closeSideMenu = useUIStore((store) => store.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isUser = session?.user.role === 'user';
  const isAdmin = session?.user.role === 'admin';

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

      <nav className={clsx(styles.nav, {
        [styles.shadow]: isSideMenuOpen,
        [styles.closedMenu]: !isSideMenuOpen
      })}>
        <IoClose className={styles.closeIcon} onClick={closeSideMenu} />

        <section className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search product ..."
          />
          <IoSearch className={styles.searchIcon} />
        </section>

        {isAuthenticated && (
          <>
            <section className={styles.linksWrapper}>
              <Link href="/profile" className={styles.link} onClick={closeSideMenu}>
                <IoPerson className={styles.linkIcon} />
                <span className={styles.linkText}>Profile</span>
              </Link>

              {(isAdmin || isUser) && (
                <Link href="/orders" className={styles.link} onClick={closeSideMenu}>
                  <IoList className={styles.linkIcon} />
                  <span className={styles.linkText}>My Orders</span>
                </Link>
              )}
            </section>

            {/* Line Separator */}
            <div className={styles.separator} />
          </>
        )}

        <section className={styles.linksWrapper}>
          <Link href="/category/men" className={styles.link} onClick={closeSideMenu}>
            <IoMan className={styles.linkIcon} />
            <span className={styles.linkText}>Men</span>
          </Link>

          <Link href="/category/women" className={styles.link} onClick={closeSideMenu}>
            <IoWoman className={styles.linkIcon} />
            <span className={styles.linkText}>Women</span>
          </Link>

          <Link href="/category/kid" className={styles.link} onClick={closeSideMenu}>
            <FaChildren className={styles.linkIcon} />
            <span className={styles.linkText}>Kids</span>
          </Link>

          <Link href="#" className={styles.link} onClick={closeSideMenu}>
            <IoPeople className={styles.linkIcon} />
            <span className={styles.linkText}>For Everyone</span>
          </Link>
        </section>

        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className={styles.separator} />

            <Link href="/products" className={styles.link} onClick={closeSideMenu}>
              <IoShirt className={styles.linkIcon} />
              <span className={styles.linkText}>Products</span>
            </Link>

            <Link href="/orders" className={styles.link} onClick={closeSideMenu}>
              <IoList className={styles.linkIcon} />
              <span className={styles.linkText}>Clients Orders</span>
            </Link>

            <Link href="#" className={styles.link} onClick={closeSideMenu}>
              <IoPeople className={styles.linkIcon} />
              <span className={styles.linkText}>Users</span>
            </Link>
          </>
        )}

        {/* Line Separator */}
        <div className={styles.separator} />

        {isAuthenticated && (
          <button
            className={styles.button}
            onClick={() => {
              logout();
              closeSideMenu();
            }}
          >
            <IoLogOut className={styles.linkIcon} />
            <span className={styles.linkText}>Log-Out</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link href="/auth/login" className={styles.link} onClick={closeSideMenu}>
            <IoLogIn className={styles.linkIcon} />
            <span className={styles.linkText}>Log-In</span>
          </Link>
        )}
      </nav>
    </section>
  );

};

export default Sidebar;
