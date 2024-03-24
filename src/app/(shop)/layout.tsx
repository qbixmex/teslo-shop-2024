import type { Metadata } from "next";
import styles from "./layout.module.css";
import TopMenu from "@/components/ui/top-menu/top-menu.component";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Shop products from Teslo Shop",
};

type Props = { children: React.ReactNode; }

const ShopLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <>
      <TopMenu />
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
};

export default ShopLayout;

