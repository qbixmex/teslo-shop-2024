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
        <div className="w-[95%] lg:w-[90%] xl:[80%] mx-auto">
          {children}
        </div>
      </main>
    </>
  );
};

export default ShopLayout;

