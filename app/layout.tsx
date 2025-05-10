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
  metadataBase: new URL("https://www.whileinqueue.io"),
  title: { default: "While in Queue", template: "%s | While in Queue" },
  description: "Quick games to play while you are waiting in queue.",
  openGraph: {
    title: "While in Queue",
    description: "Quick games to play while you are waiting in queue.",
    url: "/",
    siteName: "While in Queue",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "While in Queue",
    description: "Quick games to play while you are waiting in queue.",
    images: ["/twitter-image.png"],
  },
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
        <main>
          <Header />
          {children}
        </main>
        <SpeedInsights />
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
