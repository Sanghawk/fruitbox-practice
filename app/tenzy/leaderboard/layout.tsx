import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.whileinqueue.io"),
  title: "Tenzy Leaderboard",
  description: "Leaderboard for Tenzy",
  openGraph: {
    title: "Tenzy Leaderboard",
    description: "Leaderboard for Tenzy",
    url: "/tenzy/leaderboard",
    siteName: "Tenzy Leaderboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenzy Leaderboard",
    description: "Leaderboard for Tenzy",
  },
};
export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
