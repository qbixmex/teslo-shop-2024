"use client";

import { FC } from "react";
import { CartProduct } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "../product";
import styles from "./cart-item.module.css";
import Link from "next/link";

type Props = {
  product: CartProduct;
  checkout?: boolean;
};

const CartItem: FC<Readonly<Props>> = ({ product, checkout = false }) => {

  return (
    <section className={styles.container}>
      <Link
        href={`/product/${product.slug}`}
        className="hover:border border-blue-900 rounded-md"
        title={`View ${product.title} details`}
      >
        <Image
          src={`/products/${product.image}`}
          width={200}
          height={200}
          alt={product.title}
          className={styles.image}
        />
      </Link>
      <section>
        <h2 className={styles.title}>
          <Link
            href={`/product/${product.slug}`}
            className="hover:underline text-blue-900"
            title={`View ${product.title} details`}
          >
            {product.title}
          </Link>
        </h2>
        {
          (checkout)
            ? <div className={styles.quantity}>3 items</div>
            : (
              <QuantitySelector
                onQuantityChange={ value => console.log(value)}
                quantity={3}
              />
            )
        }
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Subtotal:</span>
          <span className={styles.priceValue}>
            $ {(product.price ?? 0 * 3).toFixed(2)}
          </span>
        </div>
        { !checkout && (<button className={styles.btn}>remove</button>) }
      </section>
    </section>
  );

};

export default CartItem;
