"use client";

import { ProductSeed } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "../product";
import styles from "./cart-item.module.css";

type Props = {
  product: ProductSeed;
  checkout?: boolean;
};

const CartItem: React.FC<Readonly<Props>> = ({ product, checkout = false }) => {

  return (
    <section key={product.slug} className={styles.container}>
      <Image
        src={`/products/${product.images[0]}`}
        width={200}
        height={200}
        alt={product.title}
        className={styles.image}
      />
      <section>
        <h2 className={styles.title}>{product.title}</h2>
        {
          (checkout)
            ? <div className={styles.quantity}>3 items</div>
            : <QuantitySelector quantity={3} />
        }
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Subtotal:</span>
          <span className={styles.priceValue}>
            $ {(product.price * 3).toFixed(2)}
          </span>
        </div>
        { !checkout && (<button className={styles.btn}>remove</button>) }
      </section>
    </section>
  );

};

export default CartItem;
