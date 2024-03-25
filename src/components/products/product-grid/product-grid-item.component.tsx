"use client";

import { FC, useState } from 'react';
import { Product } from '@/interfaces';
import Image from "next/image";
import styles from './product-grid-item.module.css';
import { paragraph, titleFont } from '@/config/fonts';
import Link from 'next/link';

type Props = { product: Product; };

const ProductGridItem: FC<Props> = ({ product }) => {
  const [ displayImage, setDisplayImage ] = useState(product.images[0]);

  return (
    <section className={`${styles.card} fade-in`}>
      <Link
        className={`${paragraph.className} ${styles.cardLink}`}
        href={`/product/${product.slug}`}
        title={`View "${product.title}" details`}
      >
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          width={500}
          height={500}
          priority={true}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className={styles.cardDetails}>
        <h3 className={`${titleFont.className} ${styles.cardTitle}`}>
          <Link
            className={`${paragraph.className} ${styles.cardLink}`}
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
        </h3>
        <p className={`${paragraph.className} ${styles.cardPrice}`}>
          <span className={styles.cardPriceLabel}>Price:</span>&nbsp;
          <span className={styles.cardPriceValue}>$ {product.price.toFixed(2)}</span>
        </p>
      </div>
    </section>
  );

};

export default ProductGridItem;
