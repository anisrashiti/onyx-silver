import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { StoreProvider } from "@/components/store-provider";
import { StorePanels } from "@/components/store-panels";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Onyx Silver — Refined silver. Timeless style.",
  description: "Discover the Onyx Silver homepage prototype. Refined silver jewelry, statement pieces, and an enduring retail and wholesale heritage in Kosovo.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={dmSans.variable}><StoreProvider><a className="skip-link" href="#main-content">Skip to content</a>{children}<StorePanels /></StoreProvider></body></html>;
}
