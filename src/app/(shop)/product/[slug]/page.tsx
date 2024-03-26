import { titleFont, paragraph } from '@/config/fonts';
import styles from './page.module.css';
import { Metadata } from 'next';
import { FC } from 'react';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: "Teslo Shop - Product #",
  description: "Product Page",
  robots: "noindex, nofollow",
};

const detailsHeading = `${titleFont.className} ${styles.detailsHeading}`;
const detailsSubheading = `${titleFont.className} ${styles.detailsSubheading}`;
const detailsParagraph = `${paragraph.className} ${styles.detailsParagraph}`;

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
      {/* Slice Show */}
      <section className={styles.sliceShow}>
        <Image
          src={`/products/${product?.images[0]}`}
          alt={product?.title ?? 'Product Image'}
          className={styles.sliceShowImage}
          width={810}
          height={810}
          priority
        />
      </section>

      {/* Details */}
      <section className={styles.details}>
        <h1 className={detailsHeading}>
          {product?.title}
        </h1>
        <p className={styles.detailsPrice}>$ {product?.price.toFixed(2)}</p>

        {/* Color */}
        <section className="mb-2">
          <h2 className={detailsSubheading}>Color</h2>
          <section className={styles.detailsColorContainer}>
            <button className={`${styles['detailsColor']} ${styles['detailsColor--light']}`} />
            <button className={`${styles['detailsColor']} ${styles['detailsColor--dark']}`} />
          </section>
        </section>

        {/* Size */}
        <section className="mb-2">
          <h2 className={detailsSubheading}>Size</h2>
          <p className={detailsParagraph}>{product?.sizes.join(' | ')}</p>
        </section>

        {/* Quantity */}
        <section>
          <h2 className={detailsSubheading}>Quantity</h2>

          <section className="flex items-center gap-3 mb-5">
            <button className={`group ${styles.buttons}`}>
              <FaPlus className={`${styles.buttonsIcon} group-hover:text-stone-600 group-active:text-stone-100`} />
            </button>
            <div className={`${paragraph.className} ${styles.quantity}`}>
              4
            </div>
            <button className={`group ${styles.buttons}`}>
              <FaMinus className={`${styles.buttonsIcon} group-hover:text-stone-600 group-active:text-stone-100`} />
            </button>
          </section>

          <section>
            <button className="w-full md:w-fit bg-blue-600 hover:bg-blue-500 active:text-stone-700 active:bg-blue-100 text-white rounded-lg px-5 py-2 transition-colors">Add to Cart</button>
          </section>
        </section>
      </section>

      {/* Description */}
      <section className={styles.detailsDescription}>
        <h2 className={detailsSubheading}>Description</h2>
        <p className={detailsParagraph}>{product?.description}</p>
      </section>
    </section>
  );
};

export default ProductPage;
