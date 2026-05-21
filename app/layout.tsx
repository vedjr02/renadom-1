import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Syne } from "next/font/google";
import { AmbientBackground } from "@/components/dashboard/ambient-background";
import { CursorGlow } from "@/components/dashboard/cursor-glow";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Q-Commerce Dark Store Analytics",
  description:
    "Live profitability and SLA analytics engine for dark store operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden bg-background font-[family-name:var(--font-dm-sans)]">
        <AmbientBackground />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
