import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AmbientBackground } from "@/components/dashboard/ambient-background";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forge Ops · Q-Commerce Command Center",
  description:
    "Industrial SLA and profitability command center for Q-Commerce dark store operations.",
  keywords: ["Q-Commerce", "SLA", "Dark Store", "Analytics", "Operations"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex bg-background font-[family-name:var(--font-body)] text-foreground">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
