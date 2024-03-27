import type { Metadata } from "next";
import "./globals.css";
import { montserrat_alternates, open_sans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Shopping for Teslo products",
};

type Props = { children: React.ReactNode; }

const RootLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <html className={`${montserrat_alternates.variable} ${open_sans.variable}`}>
      <body className="bg-stone-200">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

