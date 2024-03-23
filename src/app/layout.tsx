import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Shopping for Teslo products",
};

type Props = { children: React.ReactNode; }

const RootLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <html>
      <body className="bg-stone-200">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

