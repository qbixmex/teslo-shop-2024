"use client";

import { IoCloseOutline, IoList, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearch, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { paragraph } from '@/config/fonts';

const Sidebar = () => {
  return (
    <section style={{ display: true ? 'none' : 'block' }}>
      {/* Black Background */}
      <div className={styles.blackBG} />

      {/* Blur */}
      <div className={`fade-in ${styles.blurBG}`} />

      <nav className={styles.nav}>
        <IoCloseOutline
          className={styles.closeIcon}
          onClick={() => console.log('Closing ...')}
        />

        <section className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search product ..."
          />
          <IoSearch className={styles.searchIcon} />
        </section>

        <section className={styles.linksWrapper}>
          <Link href="#" className={styles.link}>
            <IoPersonOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Profile</span>
          </Link>

          <Link href="#" className={styles.link}>
            <IoTicketOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Orders</span>
          </Link>

          {/* TODO: Show / Hide if user is authenticated */}
          <Link href="#" className={styles.link}>
            <IoLogInOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Log-In</span>
          </Link>

          <Link href="#" className={styles.link}>
            <IoLogOutOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Log-Out</span>
          </Link>
          {/* TODO END */}
        </section>

        {/* Line Separator */}
        <div className="w-full bg-slate-300 h-px my-10" />

        <section className={styles.linksWrapper}>
          <Link href="#" className={styles.link}>
            <IoShirtOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Products</span>
          </Link>

          <Link href="#" className={styles.link}>
            <IoList className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Orders</span>
          </Link>

          <Link href="#" className={styles.link}>
            <IoPeopleOutline className={styles.linkIcon} />
            <span className={`${paragraph.className} ${styles.linkText}`}>Users</span>
          </Link>
        </section>
      </nav>
    </section>
  );

};

export default Sidebar;
