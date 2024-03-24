import type { Metadata } from "next";
import { TopMenu } from "@/components";

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
        {children}
      </main>
    </>
  );
};

export default ShopLayout;

