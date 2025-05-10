import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io/tenzy/leaderboard"),
  title: "Tenzy Leaderboard",
  description: "Leaderboard for Tenzy",
  openGraph: {
    title: "Tenzy Leaderboard",
    description: "Leaderboard for Tenzy",
    url: "[https://www.whileinqueue.io/tenzy/leaderboard](https://www.whileinqueue.io/tenzy/leaderboard)",
    siteName: "Tenzy Leaderboard",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenzy Leaderboard",
    description: "Leaderboard for Tenzy",
    images: ["/twitter-image.png"],
  },
};
export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Leaderboard",
    name: "Tenzy Leaderboard",
    url: "https://www.whileinqueue.io/tenzy/leaderboard",
    description: "Leaderboard for Tenzy",
  };
  return (
    <div className="">
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
