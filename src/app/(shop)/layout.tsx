import type { Metadata } from "next";
import { TopMenu } from "@/components";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Shop products from Teslo Shop",
};

type Props = { children: React.ReactNode; }

const ShopLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <>
      <TopMenu />
      <main>
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </>
  );
};

export default ShopLayout;

