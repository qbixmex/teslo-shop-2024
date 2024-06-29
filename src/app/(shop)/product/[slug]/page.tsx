import { FC } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions';
import { SlideShow, SlideShowMobile } from '@/components';
import { StockLabel } from '@/components/stock-label';
import AddToCart from './ui/add-to-cart';
import styles from './page.module.css';
import { Product } from '@/interfaces';

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata>  => {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);
 
  const metaTitle = (product?.title ?? '');
  const metaDescription = product?.description ?? '';

  return {
    title: metaTitle,
    description: metaDescription,
    // social media
    // openGraph: {
    //   title: metaTitle,
    //   description: metaDescription,
    //   // images: ['https://example.com/image-1.jpg', 'https://example.com/image-2.jpg'],
    //   images: [`/products/${product?.images[1]}`],
    // },
  }
};

//* This re-validates the page every 7 days
export const revalidate = 604800;

const ProductPage: FC<Props> = async ({ params }) => {

  const product = await getProductBySlug(params.slug);

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

        {/* Stock */}
        <StockLabel productId={product.id} />

        {/* Price */}
        <p className={styles.price}>
          <span>Price:</span>&nbsp;
          <span className={styles.priceNumber}>
            $ {product?.price?.toFixed(2) ?? 0.00
          }</span>
        </p>

        {/* Color */}
        <section className={styles.colorSection}>
          <h2 className={styles.heading}>Color</h2>
          <section className={styles.colorContainer}>
            <button className={`${styles.color} ${styles['color--light']}`} />
            <button className={`${styles.color} ${styles['color--dark']}`} />
          </section>
        </section>

        {/* Client Component */}
        <AddToCart product={product} />

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
