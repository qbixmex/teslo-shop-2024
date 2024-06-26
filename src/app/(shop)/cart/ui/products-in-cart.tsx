"use client";

import { FC, useEffect, useState } from "react";
import styles from "./products-in-cart.module.css";
import { CartItem } from "@/components";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";
import ProductCartSkeleton from "./products-in-cart-skeleton";

const ProductsInCart = () => {

  const router = useRouter();
  const productsInCart = useCartStore(state => state.cart);
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => setComponentLoaded(true), []);

  if (productsInCart.length === 0) {
    router.replace('/empty');
  }

  if (!componentLoaded) {
    return (
      <section className={styles.itemsSkeleton}>
        {[1, 2, 3].map((item) => (
          <ProductCartSkeleton key={item} />
        ))}
      </section>
    );
  }

  return (
    <section className={styles.itemsCart}>
      {productsInCart.map(product => (
        <CartItem
          key={`${product.slug}-${product.quantity}`}
          product={product}
        />
      ))}
    </section>
  );

};

export default ProductsInCart;
