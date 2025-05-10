import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io"),
  title: "Tenzy Changelog",
  description: "Changelog for Tenzy",
  openGraph: {
    title: "Tenzy Changelog",
    description: "Changelog for Tenzy",
    url: "/tenzy/changelog",
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
  /**
   * NOTE: JSON-LD will not work properly if you expand routes beyond /tenzy/changelogs
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Changelog",
    name: "Tenzy Changelog",
    url: "https://www.whileinqueue.io/tenzy/changelog",
    description: "Changelog for Tenzy",
  };
  return (
    <div className="prose dark:prose-invert p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
