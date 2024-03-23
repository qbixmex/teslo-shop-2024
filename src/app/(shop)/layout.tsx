import type { Metadata } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Shop products from Teslo Shop",
};

type Props = { children: React.ReactNode; }

const ShopLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};

export default ShopLayout;

