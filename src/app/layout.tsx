import type { Metadata } from "next";
import "./globals.css";
import { montserrat_alternates, open_sans } from "@/config/fonts";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: '%s - TESLO | SHOP',
    absolute: 'TESLO | SHOP',
    default: 'TESLO | SHOP',
  },
  description: "Shopping for Teslo products",
  generator: 'Next JS',
  applicationName: 'Teslo Shop',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'James Stewart' }],
  creator: 'Daniel González',
  publisher: 'John Doe',
};

type Props = { children: React.ReactNode; }

const RootLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <html className={`${montserrat_alternates.variable} ${open_sans.variable}`}>
      <body className="bg-stone-200">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

