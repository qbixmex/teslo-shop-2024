import styles from "./products-in-cart.module.css";

const ProductCartSkeleton = () => {
  return (
    <section className={styles.container}>
      <div className={styles.productImageSkeleton} />
      <section>
        <div className={styles.productTitleSkeleton} />
        <div className={styles.quantityContainerSkeleton}>
          <div className={styles.quantityBtnSkeleton} />
          <div className={styles.quantityNumberSkeleton} />
          <div className={styles.quantityBtnSkeleton} />
        </div>
        <section>
          <div className={styles.subtotalSkeleton} />
          <div className={styles.btnSkeleton} />
        </section>
      </section>
    </section>
  );
};

export default ProductCartSkeleton;