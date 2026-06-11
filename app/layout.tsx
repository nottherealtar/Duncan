import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PWARegister } from "@/components/PWARegister";
import { lilita, nunito } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duncan — Clash Royale Companion",
  description:
    "Browse meta decks, build your own, learn every card from official Supercell data, and scout player stats.",
  applicationName: "Duncan",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Duncan",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lilita.variable} ${nunito.variable}`}>
      <body className="min-h-screen">
        <PWARegister />
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
