import type { Metadata } from "next";

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
  return <div className="prose dark:prose-invert p-4">{children}</div>;
}
