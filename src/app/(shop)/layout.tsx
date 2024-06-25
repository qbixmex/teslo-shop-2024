import type { Metadata } from "next";
import { Footer, Sidebar, TopMenu } from "@/components";

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
      <Footer />
    </>
  );
};

export default ShopLayout;

