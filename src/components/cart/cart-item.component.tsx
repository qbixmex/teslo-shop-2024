"use client";

import { FC } from "react";
import { CartProduct } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "../product";
import styles from "./cart-item.module.css";
import Link from "next/link";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { FaTrash } from "react-icons/fa";

type Props = {
  product: CartProduct;
  checkout?: boolean;
};

const CartItem: FC<Readonly<Props>> = ({ product, checkout = false }) => {
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProductFromCart = useCartStore(state => state.removeProduct);

  return (
    <section className={styles.container}>
      <section className="w-[200px] flex-none">
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
            priority
          />
        </Link>
      </section>

      <section className="w-auto">
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
            ? (
              <div className={styles.quantity}>
                {product.quantity} item{ product.quantity > 1 ? 's' : '' }
              </div>
            ) : (
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={qty => updateProductQuantity(product, qty)}
              />
            )
        }

        <section className="grid grid-cols-2 gap-5">
          <div>
            <div className={styles.sizeContainer}>
              <span className={styles.sizeLabel}>Selected Size:</span>
              <span className={styles.sizeValue}>{product.size}</span>
            </div>

            <div className={styles.sizeContainer}>
              <span className={styles.unitPriceLabel}>Unit Price:</span>
              <span className={styles.unitPriceValue}>{currencyFormat(product.price)}</span>
            </div>

            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Subtotal:</span>
              <span className={styles.priceValue}>
                {currencyFormat((product.price ?? 0) * (product.quantity))}
              </span>
            </div>
          </div>
          <div className="flex justify-end items-end">
            {!checkout && (
              <button
                className={styles.btn}
                onClick={() => removeProductFromCart(product.orderId)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        </section>

      </section>
    </section>
  );

};

export default CartItem;
