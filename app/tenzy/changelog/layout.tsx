import type { Metadata } from "next";
import Script from "next/script";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io/tenzy/changelog"),
  title: "Tenzy Changelog",
  description: "Changelog for Tenzy",
  openGraph: {
    title: "Tenzy Changelog",
    description: "Changelog for Tenzy",
    url: "[https://www.whileinqueue.io/tenzy/changelog](https://www.whileinqueue.io/tenzy/changelog)",
    siteName: "Tenzy Changelog",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenzy Changelog",
    description: "Changelog for Tenzy",
    images: ["/twitter-image.png"],
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Changelog",
    name: "Tenzy Changelog",
    url: "https://www.whileinqueue.io/tenzy/changelog",
    description: "Changelog for Tenzy",
  };
  return (
    <div className="prose dark:prose-invert p-4">
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
