import type { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io/tenzy"),
  title: "Tenzy",
  description:
    "Tenzy is a game where you have select numbers on a grid that sum to ten!",
  openGraph: {
    title: "Tenzy",
    description:
      "Tenzy is a game where you have select numbers on a grid that sum to ten!",
    url: "[https://www.whileinqueue.io/tenzy](https://www.whileinqueue.io/tenzy)",
    siteName: "Tenzy",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenzy",
    description:
      "Tenzy is a game where you have select numbers on a grid that sum to ten!",
    images: ["/twitter-image.png"],
  },
};

export default function TenzyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "Tenzy",
    url: "https://www.whileinqueue.io/tenzy",
    description:
      "Tenzy is a game where you have select numbers on a grid that sum to ten!",
    gamePlatform: "Web",
    gameLocation: "https://www.whileinqueue.io/tenzy",
  };
  return (
    <TenzyContainer>
      <Script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </TenzyContainer>
  );
}

function TenzyContainer({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto max-w-screen-sm">{children}</div>;
}
