import { Lilita_One, Nunito } from "next/font/google";

export const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});
