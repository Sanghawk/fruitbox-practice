import type { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io"),
  title: "How to play Tenzy",
  description:
    "A full guide on how to play Tenzy. Includes details on the controls, the scoring system, and other game details.",
  openGraph: {
    title: "How to play Tenzy",
    description:
      "A full guide on how to play Tenzy. Includes details on the controls, the scoring system, and the leaderboard.",
    url: "/tenzy/howtoplay",
    siteName: "Tenzy",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to play Tenzy",
    description:
      "A full guide on how to play Tenzy. Includes details on the controls, the scoring system, and the leaderboard.",
  },
};

export default function HowToPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose dark:prose-invert p-4">{children}</div>;
}
