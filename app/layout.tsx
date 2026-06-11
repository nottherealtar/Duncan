import type { Metadata, Viewport } from "next";
import { MobileShell } from "@/components/layout/MobileShell";
import { PWARegister } from "@/components/PWARegister";
import { lilita, nunito } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duncan — Clash Royale",
  description: "Mobile Clash Royale companion — meta decks, deck builder, player scout.",
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
  themeColor: "#0b1a33",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lilita.variable} ${nunito.variable}`}>
      <body>
        <PWARegister />
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
