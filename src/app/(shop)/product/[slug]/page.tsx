import { FC } from 'react';

import { Metadata } from 'next';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { QuantitySelector, SizeSelector, SlideShow, SlideShowMobile } from '@/components';

export const metadata: Metadata = {
  title: "Teslo Shop - Product #",
  description: "Product Page",
  robots: "noindex, nofollow",
};

type Props = {
  params: {
    slug: string;
  };
};

export const ProductPage: FC<Props> = ({ params: { slug } }) => {

  const seedProducts = initialData.products;
  const product = seedProducts.find(product => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <section className={styles.container}>
      <section className={styles.sliceShow}>
        {/* Slideshow Mobile */}
        <SlideShowMobile
          images={product.images}
          productTitle={product.title}
          className="block md:hidden"
        />
        {/* Slideshow Desktop */}
        <SlideShow
          images={product.images}
          productTitle={product.title}
          className="hidden md:block"
        />
      </section>

      {/* Details */}
      <section className={styles.details}>
        {/* Heading */}
        <h1 className={styles.title}>
          {product?.title}
        </h1>

        {/* Price */}
        <p className={styles.price}>
          $ {product?.price.toFixed(2)}
        </p>

        {/* Color */}
        <section className={styles.colorSection}>
          <h2 className={styles.heading}>Color</h2>
          <section className={styles.colorContainer}>
            <button className={`${styles.color} ${styles['color--light']}`} />
            <button className={`${styles.color} ${styles['color--dark']}`} />
          </section>
        </section>

        <SizeSelector
          sizeSelected={product?.sizes[0]}
          availableSizes={product?.sizes}
        />

        {/* Quantity */}
        <section>
          <h2 className={styles.heading}>Quantity</h2>

          {/* Quantity Selector */}
          <QuantitySelector />

          <section>
            <button className={styles.addToCart}>
              Add to Cart
            </button>
          </section>
        </section>
      </section>

      {/* Description */}
      <section className={styles.description}>
        <h2 className={styles.heading}>Description</h2>
        <p className={styles.text}>{product?.description}</p>
      </section>
    </section>
  );
};

export default ProductPage;
