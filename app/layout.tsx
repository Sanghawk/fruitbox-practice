import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: "While in Queue",
    description: "Quick games to play while you are waiting in queue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Header />
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-Y4FG6PP673" />
      </body>
    </html>
  );
}
