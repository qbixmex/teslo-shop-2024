import type { Metadata } from "next";
import { Sidebar, TopMenu } from "@/components";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Shop products from Teslo Shop",
};

type Props = { children: React.ReactNode; }

const ShopLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <>
      <TopMenu />
      <Sidebar />
      <main>
        <div className="w-[95%] lg:w-[90%] xl:[80%] mx-auto">
          {children}
        </div>
      </main>
    </>
  );
};

export default ShopLayout;

