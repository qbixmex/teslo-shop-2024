import { FC } from 'react';

import { Metadata } from 'next';
import { initialData } from '@/seed/seed';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { SizeSelector, SlideShow } from '@/components';

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

const buttonCSS = `group ${styles.buttons}`;
const buttonIconCSS = `${styles.buttonsIcon} group-hover:text-stone-600 group-active:text-stone-100`;

export const ProductPage: FC<Props> = ({ params: { slug } }) => {

  const seedProducts = initialData.products;
  const product = seedProducts.find(product => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <section className={styles.container}>
      <section className={styles.sliceShow}>
        <SlideShow
          images={product.images}
          productTitle={product.title}
        />
      </section>

      {/* Details */}
      <section className={styles.details}>
        {/* Heading */}
        <h1 className={styles.heading}>
          {product?.title}
        </h1>

        {/* Price */}
        <p className={styles.price}>
          $ {product?.price.toFixed(2)}
        </p>

        {/* Color */}
        <section className={styles.colorSection}>
          <h2 className={styles.subheading}>Color</h2>
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
          <h2 className={styles.subheading}>Quantity</h2>

          <section className={styles.buttonsContainer}>
            <button className={buttonCSS}>
              <FaPlus className={buttonIconCSS} />
            </button>
            <div className={styles.quantity}>
              4
            </div>
            <button className={buttonCSS}>
              <FaMinus className={buttonIconCSS} />
            </button>
          </section>

          <section>
            <button className={styles.addToCart}>
              Add to Cart
            </button>
          </section>
        </section>
      </section>

      {/* Description */}
      <section className={styles.description}>
        <h2 className={styles.subheading}>Description</h2>
        <p className={styles.text}>{product?.description}</p>
      </section>
    </section>
  );
};

export default ProductPage;
