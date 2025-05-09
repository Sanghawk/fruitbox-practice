import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "while in queue | Tenzy Leaderboard",
  description: "Leaderboard for Tenzy",
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
