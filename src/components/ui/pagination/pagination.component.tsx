"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import styles from "./pagination.module.css";

type Props = {
  totalPages: number;
};

const Pagination: React.FC<Readonly<Props>> = ({ totalPages }) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...' || Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathname}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <section className={styles.container}>
      <nav className={styles.container}>
        {
          (currentPage !== 1) ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              className={styles.arrow}
            >
              <FaChevronLeft className={styles.arrowIcon} />
            </Link>
          ) : (
            <span className={styles.arrowDisabled}>
              <FaChevronLeft className={styles.arrowIcon} />
            </span>
          )
        }
        <Link
          href="#"
          className={clsx("page-link", {
            [styles.listLink]: false,
            [styles.listLinkActive]: true,
          })}
        >1</Link>
        <Link
          href="#"
          className={clsx("page-link", {
            [styles.listLink]: true,
            [styles.listLinkActive]: false,
          })}
        >2</Link>
        <Link
          href="#"
          className={clsx("page-link", {
            [styles.listLink]: true,
            [styles.listLinkActive]: false,
          })}
        >3</Link>
        <Link
          href="#"
          className={clsx("page-link", {
            [styles.listLink]: true,
            [styles.listLinkActive]: false,
          })}
        >...</Link>
        <Link
          href="#"
          className={clsx("page-link", {
            [styles.listLink]: true,
            [styles.listLinkActive]: false,
          })}
        >50</Link>
        {
          (currentPage < totalPages) ? (
            <Link href={createPageUrl(currentPage + 1)} className={styles.arrow}>
              <FaChevronRight className={styles.arrowIcon} />
            </Link>
          ) : (
            <span className={styles.arrowDisabled}>
              <FaChevronRight className={styles.arrowIcon} />
            </span>
          )
        }
      </nav>
    </section>
  );
};

export default Pagination;
