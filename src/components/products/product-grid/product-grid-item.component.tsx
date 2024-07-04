"use client";

import { FC, useState } from 'react';
import { ProductLight } from '@/interfaces';
import Image from "next/image";
import styles from './product-grid-item.module.css';
import Link from 'next/link';
import { ImagePlaceholderIcon } from '@/components';

type Props = { product: ProductLight };


const ProductGridItem: FC<Props> = ({ product }) => {
  const INITIAL_IMAGE = product.images.length !== 0 ? product.images[0] : null;
  const [ displayImage, setDisplayImage ] = useState(INITIAL_IMAGE);

  return (
    <section className={`${styles.card} fade-in`}>
      <Link
        className={styles.cardLink}
        href={`/product/${product.slug}`}
        title={`View "${product.title}" details`}
      >
        {!displayImage && (
          <ImagePlaceholderIcon size={200} className="w-full h-[310px] p-5 text-neutral-500/50 bg-gray-50 object-cover" />
        )}

        {displayImage !== null && (
          <Image
            src={`/products/${displayImage.url}`}
            alt={product.title}
            width={500}
            height={500}
            priority={true}
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
          />
        )}
      </Link>
      <div className={styles.cardDetails}>
        <h3 className={styles.cardTitle}>
          <Link
            className={styles.cardLink}
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
        </h3>
        <p className={styles.cardPrice}>
          <span className={styles.cardPriceLabel}>Price:</span>&nbsp;
          <span className={styles.cardPriceValue}>$ {product.price.toFixed(2)}</span>
        </p>
      </div>
    </section>
  );

};

export default ProductGridItem;
