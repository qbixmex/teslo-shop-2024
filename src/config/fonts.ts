import {
  Open_Sans,
  Montserrat_Alternates,
} from "next/font/google";

export const montserrat_alternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ['500', '700'],
  variable: '--font-montserrat-alternates',
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ['400', '600'],
  variable: '--font-roboto-mono',
});
