"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "../product";
import styles from "./cart-item.module.css";

type Props = {
  product: Product;
};

const CartItem: React.FC<Readonly<Props>> = ({ product }) => {

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
        <QuantitySelector quantity={3} />
        <p className={styles.price}>$ {product.price.toFixed(2)}</p>
        <button className={styles.btn}>remove</button>
      </section>
    </section>
  );

};

export default CartItem;
