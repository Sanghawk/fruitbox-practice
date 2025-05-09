import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import "./globals.css";
import ReactDOM from "react-dom";
import Link from "next/link";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "while in queue",
  description: "Quick games to pass the time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ReactDOM.preload("/sounds/consume_pop.m4a", {
    as: "audio",
    type: "audio/mpeg",
  });

  return (
    <html lang="en" className={inter.className}>
      <body className={`antialiased`}>
        <SpeedInsights />
        <main>
          <Header />
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}

function Header() {
  // Header styles
  const headerStyles = {
    position: "sticky top-0 left-0 right-0 z-50",
    dimensions: "h-[64px]",
    border: "border-b-[1px] border-base-200 dark:border-base-900",
    bgAndText: "base-bg-and-text",
  };

  return (
    <header
      className={clsx(
        headerStyles.position,
        headerStyles.dimensions,
        headerStyles.border,
        headerStyles.bgAndText
      )}
    >
      <div className="relative mx-auto max-w-screen-lg h-full">
        <div className="flex items-center h-full mx-4">
          <h1 className="text-2xl font-mono font-bold ">
            <Link className="px-2 py-1" href="/">
              w(q)
            </Link>
          </h1>
        </div>
      </div>
    </header>
  );
}
