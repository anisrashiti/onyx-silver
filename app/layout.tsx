import type { Metadata } from "next";
import { Kalnia } from "next/font/google";
import localFont from "next/font/local";
import { StoreProvider } from "@/components/store-provider";
import { StorePanels } from "@/components/store-panels";
import "./globals.css";

const editorial = Kalnia({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-editorial", display: "swap" });
const satoshi = localFont({ src: "../public/fonts/Satoshi-Variable.woff2", weight: "400 600", style: "normal", variable: "--font-interface", display: "swap", fallback: ["Arial"] });

export const metadata: Metadata = {
  title: "Onyx Silver — Refined silver. Timeless style.",
  description: "Discover Onyx Silver. Refined silver jewelry, statement pieces, and an enduring retail and wholesale heritage in Kosovo.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${editorial.variable} ${satoshi.variable}`}><StoreProvider><a className="skip-link" href="#main-content">Skip to content</a>{children}<StorePanels /></StoreProvider></body></html>;
}
