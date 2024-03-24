import {
  Inter,
  Montserrat_Alternates
} from "next/font/google";

export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ['500', '700']
});

export const paragraph = Inter({
  subsets: ["latin"],
  weight: ['200', '400', '500']
});
